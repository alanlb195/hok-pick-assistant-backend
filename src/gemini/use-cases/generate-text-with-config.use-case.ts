import { Injectable } from "@nestjs/common";
import { GeminiClient } from "src/lib/gemini-client";

@Injectable()
export class GenerateTextWithConfig {

    constructor(
        private readonly geminiClient: GeminiClient
    ) { }

    async execute(prompt: string): Promise<string> {

        const model = this.geminiClient.getModel({
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 1,
            topK: 40,
            stopSequences: [],
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }
}