import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeminiAIClient } from './gemini-client.service';

@Module({
    imports: [ConfigModule],
    providers: [GeminiAIClient],
    exports: [GeminiAIClient],
})
export class GeminiAiClientModule { }
