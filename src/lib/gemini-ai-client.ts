import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

// docs ai.google.dev/gemini-api/docs/text-generation
@Injectable()
export class GeminiAIClient {
    private ai: GoogleGenAI;
    private modelName = 'gemini-1.5-flash';

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        this.ai = new GoogleGenAI({ apiKey });
    }

    // multi conversational chat using sendMessageStream
    async sendChatMessageStream({
        history,
        message, // acts like the new prompt
        systemInstruction,
    }: {
        history: { role: 'user' | 'model'; text: string }[];
        message: string;
        systemInstruction?: string;
    }) {
        const chat = this.ai.chats.create({
            model: this.modelName,
            history: history.map(entry => ({
                role: entry.role,
                parts: [{ text: entry.text }],
            })),
            config: {
                systemInstruction,
                temperature: 0.3,
            },
        });

        const stream = await chat.sendMessageStream({ message });
        return stream;
    }

    // Simple response with system instructions and Streaming responses
    async generateContentStream(prompt: string, systemInstruction?: string) {
        const response = await this.ai.models.generateContentStream({
            model: this.modelName,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction ?? undefined,
            },
        });

        return response;
    }

    // Simple response with system instructions
    async generateContent(prompt: string, systemInstruction?: string): Promise<string> {
        const result = await this.ai.models.generateContent({
            model: this.modelName,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction ?? undefined,
            },
        });

        return result.text ?? '';
    }

}
