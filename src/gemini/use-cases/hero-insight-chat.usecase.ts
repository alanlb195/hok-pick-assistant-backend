import { Injectable } from '@nestjs/common';
import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';
import { InsightChatRecommendationDto } from '../dto/request/insight-chat-recommendation.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HeroInsightChatUseCase {
    constructor(
        private readonly geminiClient: GeminiAIClient,
        private readonly prisma: PrismaService,
    ) { }

    async executeStream(data: InsightChatRecommendationDto, res: Response) {
        const { history, message } = data;


        const heroes = await this.prisma.hero.findMany({
            select: {
                name: true,
                mainJob: true,
                recommendRoad: true,
            }
        });

        function formatHero(hero: any): string {
            return `**${hero.hero_name}**
                    Rol: ${hero.main_job_name}
                    Linea recomendada: ${hero.recommend_road_name}`;
        }

        const heroSummaries = heroes.map(formatHero).join('\n');


        const systemInstruction = `
        Eres un experto en el juego "Honor of Kings". Tu tarea es resolver las dudas de los jugadores.
        Solo puedes responder usando la lista exacta de héroes que se te proporciona a continuación. 
        **NO PUEDES INVENTAR HÉROES**. Si un usuario pregunta por un héroe que no está en la lista, debes decir claramente: "Ese héroe no está disponible actualmente".

        Nunca debes mencionar a ni ningún personaje que no esté en la lista. **Si lo haces, estás incumpliendo las reglas.**

        Además:
        - Usa siempre el idioma con el que se inició la conversación (ej. español).
        - Mantén un tono **educado y profesional** aunque el usuario esté molesto.
        - No uses lenguaje vulgar, ofensivo ni respondas con insultos. Si el usuario insulta, simplemente responde con respeto o redirige la conversación.

        Lista de héroes disponibles:
        ${heroSummaries}

        El Formato de respuesta obligatorio es en formato Markdown.
        `.trim();

        const stream = await this.geminiClient.sendChatMessageStream({
            history: history,
            message: message,
            systemInstruction: systemInstruction,
        });

        for await (const chunk of stream) {
            if (chunk.text) {
                res.write(chunk.text);
            }
        }
    }
}
