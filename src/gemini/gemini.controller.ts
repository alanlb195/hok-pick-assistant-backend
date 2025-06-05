import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeneratePickDto } from './dto/generate-pick.dto';

@Controller('gemini')
export class GeminiController {

    constructor(
        private readonly geminiService: GeminiService,
    ) { }

    @Get('generate-with-config')
    async handlePromptWithConfig(@Query('prompt') prompt: string) {
        const result = await this.geminiService.generateWithConfig(prompt)
        return { result };
    }

    @Get('generate-with-instructions')
    async handlePromptWithInstructions(@Query('prompt') prompt: string) {
        const result = await this.geminiService.generateWithInstructions(prompt);
        return { result };
    }

    @Post('recommend-pick')
    async recommendPick(@Body() body: GeneratePickDto) {
        const result = await this.geminiService.recommendPick(
            body.position,
            body.allies,
            body.enemies,
            body.role,
            body.language,
        );
        return { result };
    }

}
