// PDF to EPUB conversion service
const API_BASE = 'http://localhost:3001/api';

export interface ConvertedEpub {
  success: boolean;
  epubUrl: string;
  metadata: {
    title: string;
    author: string;
    description: string;
    originalFileName: string;
    fileSize: number;
  };
}

export interface EpubFile {
  filename: string;
  url: string;
  path: string;
}

export class PdfConverterService {
  // Convert PDF to EPUB
  static async convertPdfToEpub(
    pdfFile: File,
    title: string,
    author: string,
    description?: string
  ): Promise<ConvertedEpub> {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('title', title);
    formData.append('author', author);
    if (description) {
      formData.append('description', description);
    }

    const response = await fetch(`${API_BASE}/convert-pdf`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to convert PDF to EPUB');
    }

    return await response.json();
  }

  // Get list of converted EPUBs
  static async getEpubList(): Promise<EpubFile[]> {
    const response = await fetch(`${API_BASE}/epubs`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch EPUB list');
    }

    const data = await response.json();
    return data.epubs;
  }

  // Delete EPUB file
  static async deleteEpub(filename: string): Promise<void> {
    const response = await fetch(`${API_BASE}/epubs/${filename}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete EPUB file');
    }
  }

  // Check if backend is running
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
