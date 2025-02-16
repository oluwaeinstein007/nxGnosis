export interface VectorDBConfig {
    url: string;
    apiKey: string;
    collection: string;
  }
  
  export const defaultVectorDBConfig: VectorDBConfig = {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_API_KEY || '',
    collection: 'nxgnosis_vectors',
  };