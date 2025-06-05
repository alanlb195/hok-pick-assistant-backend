import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class GeminiClient {
    private genAI: GoogleGenerativeAI;
    private readonly modelName: string;

    constructor(private configService: ConfigService) {
        this.genAI = new GoogleGenerativeAI(this.configService.get<string>('GEMINI_API_KEY'));
        this.modelName = this.configService.get<string>('GEMINI_MODEL');
    }

    getModel(config?: {
        temperature?: number;
        maxOutputTokens?: number;
        topP?: number;
        topK?: number;
        stopSequences?: string[];
        systemInstruction?: { role: string; parts: { text: string }[] };
    }): GenerativeModel {
        return this.genAI.getGenerativeModel({
            model: this.modelName,
            generationConfig: config && {
                temperature: config.temperature,
                maxOutputTokens: config.maxOutputTokens,
                topP: config.topP,
                topK: config.topK,
                stopSequences: config.stopSequences,
            },
            systemInstruction: config?.systemInstruction,
        });
    }


    getDefaultModel(): GenerativeModel {
        return this.getModel({
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 1,
            topK: 40,
            stopSequences: [],
        });
    }

}
