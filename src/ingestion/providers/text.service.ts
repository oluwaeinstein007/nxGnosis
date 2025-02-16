import { Injectable } from '@nestjs/common';
import { Document } from 'langchain/document';
@Injectable()
export class TextService {
  cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  splitIntoChunks(text: string, chunkSize: number = 500): string[] {
    return text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  }

  chunkText(text: string, chunkSize: number = 1000): Document[] {
    const words = text.split(' ');
    const chunks: Document[] = [];
    
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chunks.push(new Document({ pageContent: chunk, metadata: { index: i / chunkSize } }));
    }
    
    return chunks;
  }
}