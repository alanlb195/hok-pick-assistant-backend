import { Body, Controller, Post, Res } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

// dtos
import { GeneratePickDto } from './dto/request/generate-pick.dto';
import { InsightChatRecommendationDto } from './dto/request/insight-chat-recommendation.dto';
import { AnalyzeImageDto } from './dto/request/analize-image.dto';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
    constructor(private readonly geminiService: GeminiService) { }

    @Post('analyze-image')
    @ApiOperation({ summary: 'Analiza una imagen y devuelve una respuesta de Gemini' })
    @ApiBody({ type: AnalyzeImageDto })
    async analyzeImage(@Body() body: AnalyzeImageDto): Promise<string> {
        const { base64Image, prompt } = body;
        return this.geminiService.analyzeImage(base64Image, prompt);
    }
    
    @Post('stream-pick')
    @ApiOperation({
        summary: 'Generar recomendaciones de personajes usando text/event-stream',
        description: `Este endpoint devuelve una respuesta en tiempo real usando "text/event-stream". No es testeable desde Swagger.
        usable solo desde frontend (Next.js, React, etc) o herramientas que soporten streams como curl. A continuacion un ejemplo para
        usar en la terminal con curl:
        
        curl -N -X POST http://localhost:3001/api/v1/gemini/stream-pick \
        -H "Content-Type: application/json" \
        -d '{
            "position": 1,
            "allies": ["Ying Zheng", "Zhou Yu"],
            "enemies": ["Li Bai", "Hou Yi"],
            "language": "es",
            "role": "top"
        }'
    `,
    })
    @ApiBody({ type: GeneratePickDto })
    async streamPick(@Body() body: GeneratePickDto, @Res() res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        await this.geminiService.executeGeneratePickRecommendationStream(body, res);
        res.end();
    }

    @Post('hero-chat-stream')
    @ApiOperation({
        summary: 'chat conversacional con historial para ayudar a los jugadores. usa text/event-stream',
        description: `Endpoint para generar una respuesta con IA (chat conversacional) usando gemini y haciendo uso un historial para que la IA tenga todo
        el contexto de la conversacion que ha tenido el usuario, esto es siempre tomando como contexto un systemInstruction que le ayuda a la IA a saber sobre
        la base de datos actual del sistema (personajes) y se le dice que responda a las dudas de los jugadores sobre los personajes.
        A continuacion un ejemplo con curl para probar desde la terminal:


        curl -N -X POST http://localhost:3001/api/v1/gemini/hero-chat-stream \
        -H "Content-Type: application/json" \
        -H "Accept: text/event-stream" \
        -d '{
            "history": [
            {
                "role": "user",
                "text": "¿Qué héroe hace buen combo con Yao?"
            },
            {
                "role": "model",
                "text": "Zhuangzi es una gran elección porque puede protegerla mientras se lanza al combate."
            }
            ],
            "message": "¿Y qué pasa si los enemigos tienen a Lü Bu?"
        }'
        `
    })
    async handleHeroChat(@Body() body: InsightChatRecommendationDto, @Res() res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        await this.geminiService.streamHeroInsightChatUseCase(body, res);
        res.end();
    }

}
