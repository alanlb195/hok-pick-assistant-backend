import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

import { GeminiClient } from 'src/lib/gemini-client';

// use cases
import { GenerateTextWithConfig } from './use-cases/generate-text-with-config.use-case';
import { GenerateTextWithInstructions } from './use-cases/generate-text-with-instructions.use-case';
import { GeneratePickRecommendation } from './use-cases/generate-pick-recommendation.use.case';


@Module({
  providers: [
    GeminiService,
    GeminiClient,
    GenerateTextWithConfig,
    GenerateTextWithInstructions,
    GeneratePickRecommendation
  ],
  controllers: [GeminiController],
  exports: [GeminiService],
})
export class GeminiModule { }
