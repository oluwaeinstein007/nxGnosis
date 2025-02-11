import { Injectable } from '@nestjs/common';

@Injectable()
export class TextService {
  cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  splitIntoChunks(text: string, chunkSize: number = 500): string[] {
    return text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  }
}