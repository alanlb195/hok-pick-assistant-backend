import { Injectable } from '@nestjs/common';
import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class GeneratePickRecommendationStream {

    constructor(
        private readonly geminiClient: GeminiAIClient,
        private readonly prisma: PrismaService,
    ) { }

    async execute(data: {
        position: number;
        allies: string[];
        enemies: string[];
        language: string;
        role: string;
    }, res: Response): Promise<void> {

        const { position, allies, enemies, language, role } = data;

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
                    Ruta recomendada: ${hero.recommend_road_name}`;
        }

        const heroSummaries = heroes.map(formatHero).join('\n');

        const prompt = `
        Tu rol es: **${role}**
        Tu posición es: **${position}**
        Aliados: ${allies.join(', ')}
        Enemigos: ${enemies.join(', ')}

        Con base en esta información, necesito que me recomiendes héroes de mi lista que hagan sinergia con los aliados y contrarresten a los enemigos.
        `.trim();

        const systemInstruction = `
        Eres un experto analista de composiciones en el juego "Honor of Kings".
        Tu tarea es recomendar únicamente héroes de la siguiente lista personalizada y bajo ninguna circunstancia puedes mencionar otro heroe inexistente en esta lista.
        La recomendacion que des, debe ser con base al rol, aliados y enemigos.

        Lista de héroes disponibles:
        ${heroSummaries}

        Por favor, responde en **${language}** y utiliza el siguiente formato en markdown:

        1. Nombre del héroe: Explicación corta de no mas de 3 lineas de por qué es una buena elección.
        2. Nombre del héroe: Explicación corta de no mas de 3 lineas de por qué es una buena elección.
        ...

        Si no hay suficiente contexto, puedes sugerir héroes versátiles dentro del rol asignado. En este caso puedes mencionar hasta 10 personajes diferentes para que el usuario tenga muchas opciones.
        
        De ninguna forma puedes mencionar los datos internos de cada heroe como sus habilidades especificas, solo menciona cosas generales para hacer sentir seguro al usuario sobre las opciones que le das.
        De ninguna forma puedes generar parrafor de informacion adicional a la lista que se te pide generar.
        Lo unico que debes generar es la lista de personajes, sus ventajas y sus debilidades en general.
        `.trim();

        const stream = await this.geminiClient.generateContentStream(prompt, systemInstruction);

        for await (const chunk of stream) {
            if (chunk.text) {
                res.write(chunk.text);
            }
        }
    }
}
