import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs/promises';

@Injectable()
export class PdfService {
  async parsePdf(filePath: string): Promise<string> {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    } catch (error) {
      throw new Error(`Error parsing PDF: ${error.message}`);
    }
  }

  async parsePdfBuffer(file: Buffer): Promise<string> {
    try {
      const pdfData = await pdfParse(file);
      return pdfData.text;
    } catch (error) {
      throw new Error(`Error parsing PDF: ${error.message}`);
    }
  }
}