import { Injectable } from '@nestjs/common';
import { GeminiClient } from 'src/lib/gemini-client';

@Injectable()
export class GeneratePickRecommendation {
    constructor(private readonly geminiClient: GeminiClient) { }

    async execute(data: {
        position: number;
        allies: string[];
        enemies: string[];
        language: string;
        role: string;
    }): Promise<string> {
        const { position, allies, enemies, language, role } = data;

        const prompt = `
You are helping a player select a hero in the game Honor of Kings.
The player is picking at position ${position}/10 and will play the role of "${role}".
Allied heroes: ${allies.length ? allies.join(', ') : 'none'}.
Enemy heroes: ${enemies.length ? enemies.join(', ') : 'none'}.
Suggest the best hero for this role and situation.
Respond in ${language}.
`;

        const model = this.geminiClient.getModel({
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 1,
            topK: 40,
            stopSequences: [],
            systemInstruction: {
                role: 'system',
                parts: [
                    {
                        text: `
You are an expert player of the MOBA game Honor of Kings.
You assist players in ranked hero selection based on their assigned role, allied and enemy picks.
If asked about another game, reply that you are only trained in Honor of Kings.
Respond in the language the user specifies.
          `.trim(),
                    },
                ],
            },
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }
}
