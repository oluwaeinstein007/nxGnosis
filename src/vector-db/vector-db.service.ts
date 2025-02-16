import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/client';

@Injectable()
export class VectorDbService {
  private qdrant: QdrantClient;

  constructor() {
    this.qdrant = new QdrantClient({
      url: process.env.QDRANT_URL, // From environment variables
      port: process.env.QDRANT_PORT,
    });
  }

  async search(queryVector: number[], collectionName: string) { // Example
      // ... (qDrant search logic)
  }
}