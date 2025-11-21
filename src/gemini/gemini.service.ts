import { Injectable } from '@nestjs/common';
import { Response } from 'express';

// dtos
import { HeroInsightChatUseCase } from './use-cases/hero-insight-chat.usecase';
import { GeneratePickDto } from './dto/request/generate-pick.dto';

// Use cases
import { GeneratePickRecommendationStream } from './use-cases/generate-pick-recommendation-stream.usecase';
import { InsightChatRecommendationDto } from './dto/request/insight-chat-recommendation.dto';
import { AnalyzeImageUseCase } from './use-cases/analyze-image.usecase';

@Injectable()
export class GeminiService {
  constructor(
    private readonly generatePickRecommendationStream: GeneratePickRecommendationStream,
    private readonly heroInsightChatUseCase: HeroInsightChatUseCase,
    private readonly analyzeImageUseCase: AnalyzeImageUseCase
  ) { }

  async analyzeImage(base64Image: string, prompt: string): Promise<string> {
    return await this.analyzeImageUseCase.execute({ base64Image, prompt });
  }

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