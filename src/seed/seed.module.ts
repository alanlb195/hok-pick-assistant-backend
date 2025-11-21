import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QdrantService } from 'src/integrations/qdrant/qdrant.service';
import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    PrismaService,
    QdrantService,
    GeminiAIClient,
  ],
})
export class SeedModule { }
