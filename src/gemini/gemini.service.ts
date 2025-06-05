import { Injectable } from '@nestjs/common';

// Use cases
import { GenerateTextWithConfig } from './use-cases/generate-text-with-config.use-case';
import { GenerateTextWithInstructions } from './use-cases/generate-text-with-instructions.use-case';
import { GeneratePickRecommendation } from './use-cases/generate-pick-recommendation.use.case';

@Injectable()
export class GeminiService {

    constructor(
        private readonly generateTextWithConfig: GenerateTextWithConfig,
        private readonly generateTextWithInstructions: GenerateTextWithInstructions,
        private readonly generatePickRecommendation: GeneratePickRecommendation
    ) { }

    async generateWithConfig(prompt: string) {
        return await this.generateTextWithConfig.execute(prompt);
    }

    async generateWithInstructions(prompt: string): Promise<string> {
        return await this.generateTextWithInstructions.execute(prompt);
    }

    async recommendPick(position: number, allies: string[], enemies: string[], role: string, language: string): Promise<string> {
        return await this.generatePickRecommendation.execute({ position, allies, enemies, role, language});
    }

}