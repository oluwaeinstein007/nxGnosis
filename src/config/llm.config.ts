export interface LLMConfig {
    model: string;
    apiKey: string;
    temperature: number;
    maxTokens: number;
  }
  
  export const defaultLLMConfig: LLMConfig = {
    model: 'deepseek',
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    temperature: 0.7,
    maxTokens: 2048,
  };