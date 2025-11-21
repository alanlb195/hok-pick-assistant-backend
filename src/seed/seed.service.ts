// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HEROES } from './data/heroes';

@Injectable()
export class SeedService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async seedDatabase() {
        // Vaciar tabla heroes
        await this.prisma.hero.deleteMany();
        
        // Insertar heroes
        await this.prisma.hero.createMany({
            data: HEROES,
            skipDuplicates: true,
        });
        return { message: 'Seed completed.' };
    }

}
