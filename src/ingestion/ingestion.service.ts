import { Injectable } from '@nestjs/common';
import { PdfService } from './providers/pdf.service';
import { WebService } from './providers/web.service';
import { TextService } from './providers/text.service';
import { VectorDbService } from '../vector-db/vector-db.service';

@Injectable()
export class IngestionService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly webService: WebService,
    private readonly textService: TextService,
    private readonly vectorDbService: VectorDbService,
  ) {}

  async ingestPDF(file: Buffer): Promise<string> {
    try {
      const text = await this.pdfService.extract(file);
      const chunks = this.textService.chunkText(text);
      await this.vectorDbService.storeVectors(chunks);
      return 'PDF processed successfully';
    } catch (error) {
      throw new Error(`Failed to process PDF: ${error.message}`);
    }
  }

  async ingestWebsite(url: string): Promise<string> {
    try {
      const content = await this.webService.scrape(url);
      const chunks = this.textService.chunkText(content);
      await this.vectorDbService.storeVectors(chunks);
      return 'Website content processed successfully';
    } catch (error) {
      throw new Error(`Failed to process website: ${error.message}`);
    }
  }

  async ingestText(text: string): Promise<string> {
    try {
      const chunks = this.textService.chunkText(text);
      await this.vectorDbService.storeVectors(chunks);
      return 'Text processed successfully';
    } catch (error) {
      throw new Error(`Failed to process text: ${error.message}`);
    }
  }
}