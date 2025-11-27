// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HEROES } from './data/heroes';
import { ARCANA_STATS, ARCANAS } from './data/arcana';
import { STAT } from './data/stat';

@Injectable()
export class SeedService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async seedDatabase() {
        console.log("🚀 Iniciando seed...");

        await this.insertHeroes();
        await this.insertStats();
        await this.insertArcanas();

        console.log("🌱 Seed completado.");
        return "🚀 SEED EXECUTED!"
    }

    async insertHeroes() {
        try {
            await this.prisma.hero.deleteMany();
            await this.prisma.hero.createMany({
                data: HEROES,
                skipDuplicates: true,
            });

            console.log("✓ Heroes seeded correctamente");

        } catch (error) {
            console.error("Error seeding heroes");
            console.error(error);
        }
    }

    async insertStats() {
        try {
            await this.prisma.stat.deleteMany();
            await this.prisma.stat.createMany({
                data: STAT,
                skipDuplicates: true,
            });
        } catch (error) {
            console.error("Error seeding stats");
            console.error(error);
        }
    }


    async insertArcanas() {
        await this.prisma.arcana.deleteMany();
        await this.prisma.arcanaStat.deleteMany();

        // 1. Insertar arcanas
        await this.prisma.arcana.createMany({
            data: ARCANAS,
            skipDuplicates: true
        });

        console.log("✓ Arcanas seeded");

        // 2. Insertar ArcanaStat
        for (const stat of ARCANA_STATS) {

            const statEntity = await this.prisma.stat.findUnique({
                where: { code: stat.statCode }
            });

            if (!statEntity) {
                console.error(`❌ Stat no encontrado: ${stat.statCode}`);
                continue;
            }

            try {
                await this.prisma.arcanaStat.create({
                    data: {
                        arcanaId: stat.arcanaId,
                        statId: statEntity.id,
                        value: stat.value
                    }
                });

            } catch (error) {
                console.error(`❌ Error creando arcanaStat para arcanaId ${stat.arcanaId}`);
                console.error(error);
            }
        }

        console.log("✓ ArcanaStats seeded");
    }


}
