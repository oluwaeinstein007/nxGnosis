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

  async storeVectors(vectors: any[]): Promise<void> {
    await this.qdrant.upsert('default', vectors);
  }
  
  async upsertEmbeddings(collectionName: string, embeddings: any[]): Promise<void> {
    await this.qdrant.upsert(collectionName, embeddings);
  }

  async searchEmbeddings(collectionName: string, queryEmbedding: number[], topK: number): Promise<any[]> {
    return this.qdrant.search(collectionName, queryEmbedding, topK);
  }
}