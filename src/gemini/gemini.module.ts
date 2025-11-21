import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

import { PrismaModule } from 'src/prisma/prisma.module';

// use cases
import { GeneratePickRecommendationStream } from './use-cases/generate-pick-recommendation-stream.usecase';
import { HeroInsightChatUseCase } from './use-cases/hero-insight-chat.usecase';
import { AnalyzeImageUseCase } from './use-cases/analyze-image.usecase';
import { GeminiAiClientModule } from 'src/integrations/gemini/gemini-client.module';

// service providers
// import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';
// import { QdrantService } from 'src/integrations/qdrant/qdrant.service';


@Module({
  providers: [
    GeminiService,
    GeneratePickRecommendationStream,
    HeroInsightChatUseCase,
    AnalyzeImageUseCase,
    // GeminiAIClient,
    // QdrantService,
  ],
  controllers: [GeminiController],
  exports: [GeminiService],
  imports: [
    PrismaModule,
    GeminiAiClientModule,
  ],
})
export class GeminiModule { }
