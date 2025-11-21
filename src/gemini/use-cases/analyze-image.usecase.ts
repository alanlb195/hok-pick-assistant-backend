// src/gemini/use-cases/analyze-image.usecase.ts
import { Injectable } from '@nestjs/common';
import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';

@Injectable()
export class AnalyzeImageUseCase {
    constructor(private readonly geminiClient: GeminiAIClient) {}

    async execute(params: { base64Image: string; prompt: string }): Promise<string> {
        const { base64Image, prompt } = params;
        return await this.geminiClient.analyzeImageFromBase64(base64Image, prompt);
    }
}
