# PDF to EPUB Conversion Backend

This backend service converts PDF files to EPUB format for use in the ebook reader.

## Features

- Upload PDF files via REST API
- Convert PDFs to EPUB format automatically
- Serve converted EPUB files
- File size limit: 50MB
- Automatic cleanup of uploaded PDFs after conversion

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/health` - Check if service is running

### Convert PDF to EPUB
- **POST** `/api/convert-pdf`
  - Body: `multipart/form-data`
  - Fields:
    - `pdf` (file): PDF file to convert
    - `title` (string): Book title
    - `author` (string): Author name
    - `description` (string, optional): Book description

### List EPUB Files
- **GET** `/api/epubs` - Get list of all converted EPUB files

### Delete EPUB File
- **DELETE** `/api/epubs/:filename` - Delete a specific EPUB file

### Serve EPUB Files
- **GET** `/epubs/:filename` - Download/view EPUB files


## File Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── uploads/           # Temporary PDF storage
├── public/
│   └── epubs/         # Converted EPUB files
└── temp/              # Temporary files
```

## Dependencies

- **express**: Web framework
- **multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **epub-gen**: EPUB file generation
- **sharp**: Image processing
- **fs-extra**: Enhanced file system operations
- **uuid**: Unique ID generation

## Usage in Frontend

The frontend can use the converted EPUB files by accessing them via:
```
http://localhost:3001/epubs/filename.epub
```

Update your mock data or database to use these URLs instead of local file paths.

## Error Handling

The service includes comprehensive error handling for:
- Invalid file types
- File size limits
- PDF parsing errors
- EPUB generation failures
- File system errors

## Security Notes

- File uploads are limited to PDF files only
- Maximum file size is 50MB
- Uploaded PDFs are automatically deleted after conversion
- No authentication is implemented (add as needed for production)
