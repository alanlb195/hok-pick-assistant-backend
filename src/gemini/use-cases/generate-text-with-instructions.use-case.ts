import { Injectable } from "@nestjs/common";
import { GeminiClient } from "src/lib/gemini-client";

@Injectable()
export class GenerateTextWithInstructions {

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
            systemInstruction: {
                role: 'system', parts: [{
                    text: `You are an experienced MOBA-type video game player who helps resolve questions for players of a cell phone video game called Honor of Kings.
                    If you are asked questions regarding another video game, you have to respond that you do not have the capacity to answer those questions.`
                }]
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }
}