import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

import { GeminiAIClient } from 'src/lib/gemini-ai-client';

import { PrismaModule } from 'src/prisma/prisma.module';

// use cases
import { GeneratePickRecommendationStream } from './use-cases/generate-pick-recommendation-stream.use.case';
import { HeroInsightChatUseCase } from './use-cases/hero-insight-chat.use.case';


@Module({
  providers: [
    GeminiService,
    GeminiAIClient,
    GeneratePickRecommendationStream,
    HeroInsightChatUseCase,
  ],
  controllers: [GeminiController],
  exports: [GeminiService],
  imports: [PrismaModule],
})
export class GeminiModule { }
