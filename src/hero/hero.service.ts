import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HeroService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    // Get all
    async getHeroes() {
        const hero = await this.prisma.hero.findMany({
            select: {
                id: true,
                image: true,
                name: true,
                recommendRoad: true,
                mainJob: true,
            }
        });
        return hero;
    }

    // Get One
    async getHero(id: number) {
        const hero = await this.prisma.hero.findFirst({
            select: {
                id: true,
                name: true,
                mainJob: true,
                recommendRoad: true,
                image: true,
            },
            where: {
                id: id
            }
        });

        if (!hero) {
            throw new NotFoundException(`Hero with ID ${id} not found`);
        }

        return hero;
    }


    getHeroFormSchema() {
        return [
            {
                type: "text",
                name: "name",
                label: "Hero Name",
                placeholder: "Enter hero name",
                value: "",
                validations: [
                    { type: "required" },
                    { type: "minLength", value: 2 }
                ]
            },
            {
                type: "text",
                name: "mainJob",
                label: "Main Job",
                placeholder: "e.g., Fighter, Mage",
                value: ""
            },
            {
                type: "text",
                name: "recommendRoad",
                label: "Recommended Road",
                placeholder: "e.g., Jungle, Mid, Support",
                value: ""
            },
            {
                type: "text",
                name: "image",
                label: "Image URL",
                placeholder: "https://...",
                value: "",
                validations: [
                    { type: "required" }
                ]
            }
        ];
    }


}
