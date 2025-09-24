const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const pdfParse = require('pdf-parse');
const Epub = require('epub-gen');

// Import routes
const readingProgressRoutes = require('./routes/reading-progress');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const epubDir = path.join(__dirname, 'public', 'epubs');
const tempDir = path.join(__dirname, 'temp');

[uploadsDir, epubDir, tempDir].forEach(dir => {
  fs.ensureDirSync(dir);
});

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// PDF to EPUB conversion function
async function convertPdfToEpub(pdfPath, epubPath, metadata = {}) {
  try {
    // Read PDF file
    const pdfBuffer = await fs.readFile(pdfPath);
    const pdfData = await pdfParse(pdfBuffer);
    
    // Extract text content
    const text = pdfData.text;
    
    // Split text into chapters/pages (simple approach)
    const pages = text.split(/\n\s*\n/).filter(page => page.trim().length > 50);
    
    // Create EPUB content
    const epubContent = pages.map((page, index) => ({
      title: `Chapter ${index + 1}`,
      data: `<h2>Chapter ${index + 1}</h2><p>${page.trim()}</p>`
    }));
    
    // EPUB options
    const options = {
      title: metadata.title || 'Converted Book',
      author: metadata.author || 'Unknown Author',
      content: epubContent,
      output: epubPath,
      verbose: true
    };
    
    // Generate EPUB
    await new Epub(options).promise;
    
    return {
      success: true,
      message: 'PDF converted to EPUB successfully',
      epubPath: path.relative(path.join(__dirname, 'public'), epubPath)
    };
    
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error(`Failed to convert PDF to EPUB: ${error.message}`);
  }
}

// Routes

// Reading progress routes
app.use('/api/reading-progress', readingProgressRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF to EPUB conversion service is running' });
});

// Upload and convert PDF to EPUB
app.post('/api/convert-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    const { title, author, description } = req.body;
    const pdfPath = req.file.path;
    const epubFileName = `${uuidv4()}.epub`;
    const epubPath = path.join(epubDir, epubFileName);
    
    console.log(`Converting PDF: ${req.file.originalname}`);
    
    // Convert PDF to EPUB
    const result = await convertPdfToEpub(pdfPath, epubPath, {
      title: title || req.file.originalname.replace('.pdf', ''),
      author: author || 'Unknown Author',
      description: description || ''
    });
    
    // Clean up uploaded PDF
    await fs.remove(pdfPath);
    
    res.json({
      success: true,
      epubUrl: `/epubs/${epubFileName}`,
      metadata: {
        title: title || req.file.originalname.replace('.pdf', ''),
        author: author || 'Unknown Author',
        description: description || '',
        originalFileName: req.file.originalname,
        fileSize: req.file.size
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to convert PDF to EPUB', 
      details: error.message 
    });
  }
});

// Get list of converted EPUBs
app.get('/api/epubs', async (req, res) => {
  try {
    const epubFiles = await fs.readdir(epubDir);
    const epubList = epubFiles
      .filter(file => file.endsWith('.epub'))
      .map(file => ({
        filename: file,
        url: `/epubs/${file}`,
        path: path.join(epubDir, file)
      }));
    
    res.json({ epubs: epubList });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list EPUB files' });
  }
});

// Delete EPUB file
app.delete('/api/epubs/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(epubDir, filename);
    
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      res.json({ success: true, message: 'EPUB file deleted successfully' });
    } else {
      res.status(404).json({ error: 'EPUB file not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete EPUB file' });
  }
});

// Serve EPUB files
app.use('/epubs', express.static(epubDir));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF to EPUB conversion service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Upload endpoint: http://localhost:${PORT}/api/convert-pdf`);
});
