import { Injectable } from '@nestjs/common';
import { LangChain } from 'langchain'; // Import LangChain
import { LLMConfig, defaultLLMConfig } from '../config/llm.config';

@Injectable()
export class AiService {
  private llm: LangChain;
  private config: LLMConfig;

  constructor(config: LLMConfig = defaultLLMConfig) {
    this.config = config;
    this.initializeLLM();
  }

  private async initializeLLM() {
    this.llm = new LangChain({
      model: this.config.model,
      apiKey: this.config.apiKey,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
    });
  }

  async generateResponse(prompt: string, context: string): Promise<string> {
    try {
      const response = await this.llm.complete({
        prompt: this.buildPrompt(prompt, context),
        temperature: this.config.temperature,
        maxTokens: this.config.maxTokens,
      });

      return response.text;
    } catch (error) {
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  }

  // async generateResponse(question: string, context: string): Promise<string> {
  //   try {
  //       const response = await this.llm.call(`${question}\n\nContext: ${context}`);
  //       return response;
  //   } catch (error) {
  //     console.error("Error generating response:", error);
  //     throw new Error(`Error generating AI response: ${error.message}`);
  //   }
  // }

  private buildPrompt(userPrompt: string, context: string): string {
    return `
    Context: ${context}

    User Question: ${userPrompt}

    Please provide a detailed and accurate response based on the context provided above.
        `.trim();
      }

      async generateReport(data: string, format: 'research' | 'summary'): Promise<string> {
        const prompt = format === 'research' 
          ? 'Generate a detailed research paper from the following data:'
          : 'Create a concise summary report from the following data:';
        
        return this.generateResponse(prompt, data);
  }
}