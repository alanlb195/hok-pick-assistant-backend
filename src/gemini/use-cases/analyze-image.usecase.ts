// src/gemini/use-cases/analyze-image.usecase.ts
import { Injectable } from '@nestjs/common';
import { GeminiAIClient } from 'src/integrations/gemini/gemini-client.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class AnalyzeImageUseCase {

    constructor(
        private readonly geminiClient: GeminiAIClient,
        private readonly prisma: PrismaService
    ) { }

    async execute(params: { base64Image: string }): Promise<any> {

        const { base64Image } = params;

        const stats = await this.prisma.stat.findMany();
        const tags = await this.prisma.tag.findMany();

        const skillAttributeSchema = z.object({
            statCode: z.string(),
            unit: z.string().optional(),
            baseValue: z.number().nullable().optional(),
            level1: z.number().nullable().optional(),
            level2: z.number().nullable().optional(),
            level3: z.number().nullable().optional(),
            level4: z.number().nullable().optional(),
            level5: z.number().nullable().optional(),
            level6: z.number().nullable().optional(),
        });

        const existingTagSchema = z.object({
            code: z.string(),
            es_name: z.string(),
            background: z.string()
        });

        const newTagSchema = z.object({
            es_name: z.string()
        });

        const newStatSchema = z.object({
            name: z.string()
        });

        const skillSchema = z.object({
            name: z.string(),
            tags: z.array(existingTagSchema),
            newTags: z.array(newTagSchema),
            newStats: z.array(newStatSchema), // ← FIX IMPORTANTISIMO

            description: z.string(),
            extraInfo: z.string().optional(),

            order: z.number(),

            attributes: z.array(skillAttributeSchema)
        });

        const prompt = `
        Analiza la imagen proporcionada. La imagen contiene la información de una habilidad de un héroe estilo MOBA.

        ### OBJETIVO
        Debes devolver un JSON válido según el schema proporcionado por el sistema.

        --- TAGS EXISTENTES ---
        ${JSON.stringify(tags)}

        --- STATS EXISTENTES ---
        ${JSON.stringify(stats)}

        ### REGLAS
        - "tags" deben existir en la base de datos
        - "newTags" son tags desconocidos
        - "attributes" deben mapearse a los Stat.code conocidos
        - Si un atributo no coincide con ningún stat existente, colócalo en "newStats"

        ### PARSEO VISUAL
        - Respeta colores usando <span style="color:#hex">texto</span>
        - Sustituye iconos por emojis: 🗡️ ✨ 🛡️

        ### ORDER
        - “Pasiva” → 0
        - “Habilidad 1/2/3” → extraer número

        SI NO ESTÁS SEGURO → devuelve null.
        `.trim();

        const response = await this.geminiClient.analyzeImageFromBase64(
            base64Image,
            prompt,
            "image/jpeg",
            skillSchema
        );

        const parsed = skillSchema.parse(JSON.parse(response));

        return parsed;
    }
}
