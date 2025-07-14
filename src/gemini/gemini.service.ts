import { Injectable } from '@nestjs/common';
import { Response } from 'express';

// dtos
import { HeroInsightChatUseCase } from './use-cases/hero-insight-chat.use.case';
import { GeneratePickDto } from './dto/request/generate-pick.dto';

// Use cases
import { GeneratePickRecommendationStream } from './use-cases/generate-pick-recommendation-stream.use.case';
import { InsightChatRecommendationDto } from './dto/request/insight-chat-recommendation.dto';

@Injectable()
export class GeminiService {
  constructor(
    private readonly generatePickRecommendationStream: GeneratePickRecommendationStream,
    private readonly heroInsightChatUseCase: HeroInsightChatUseCase,
  ) { }

  async executeGeneratePickRecommendationStream(
    data: GeneratePickDto,
    res: Response
  ) {
    return await this.generatePickRecommendationStream.execute(data, res);
  }

  async streamHeroInsightChatUseCase(
    data: InsightChatRecommendationDto,
    res: Response
  ) {
    return await this.heroInsightChatUseCase.executeStream(data, res);
  }

}