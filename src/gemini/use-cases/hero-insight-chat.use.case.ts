// src/gemini/use-cases/hero-insight-chat.use.case.ts
import { Injectable } from '@nestjs/common';
import { GeminiAIClient } from 'src/lib/gemini-ai-client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsightChatRecommendationDto } from '../dto/request/insight-chat-recommendation.dto';
import { Response } from 'express';

@Injectable()
export class HeroInsightChatUseCase {
    constructor(
        private readonly geminiClient: GeminiAIClient,
        private readonly prisma: PrismaService,
    ) { }

    async executeStream(data: InsightChatRecommendationDto, res: Response) {
        const { history, message } = data;


        const heroes = await this.prisma.heroes.findMany({
            select: {
                hero_name: true,
                main_job_name: true, // ej. Tanque, Tirador, Luchador, Soporte
                recommend_road_name: true, // ej. // Merodeador (Soporte), Línea de choque (Top), Linea de farmeo (Tirador), Línea central (Mago)
                hero_skills: {
                    select: {
                        skill_name: true, // nombre de la habilidad del heroe
                        skill_desc: true // descripcion basica de lo que hace la habiliad del heroe
                    }
                }
            }
        });

        function formatHero(hero: any): string {
            const skills = hero.hero_skills.map(skill => `- ${skill.skill_name}: ${skill.skill_desc}`).join('\n');
            return `Nombre del héroe: ${hero.hero_name}
                    Rol: ${hero.main_job_name}
                    Ruta recomendada: ${hero.recommend_road_name}
                    Habilidades:
                    ${skills}
                    `;
        }

        const heroSummaries = heroes.map(formatHero).join('\n');

        const systemInstruction = `
        Eres un experto en el juego "Honor of Kings". Solo puedes responder usando la lista exacta de héroes que se te proporciona a continuación. 
        **NO PUEDES INVENTAR HÉROES**. Si un usuario pregunta por un héroe que no está en la lista, debes decir claramente: "Ese héroe no está disponible actualmente".

        Nunca debes mencionar héroes como Gusion, Lancelot, Guinevere, ni ningún personaje que no esté en la lista. **Si lo haces, estás incumpliendo las reglas.**

        Además:
        - Usa siempre el idioma con el que se inició la conversación (ej. español).
        - Mantén un tono **educado y profesional** aunque el usuario esté molesto.
        - No uses lenguaje vulgar, ofensivo ni respondas con insultos. Si el usuario insulta, simplemente responde con respeto o redirige la conversación.

        Lista de héroes disponibles:
        ${heroSummaries}

        Formato de respuesta obligatorio (en Markdown):

        1. **Nombre del héroe**: Explicación breve de por qué es counter o sinergia (máximo 3 líneas).
        2. **Nombre del héroe**: (siguiente explicación).
        `.trim();

        const stream = await this.geminiClient.sendChatMessageStream({
            history: history,
            message: message,
            systemInstruction: systemInstruction
        });

        for await (const chunk of stream) {
            if (chunk.text) {
                res.write(chunk.text);
            }
        }

    }
}
