import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCounterDto } from './dto/request/add-counter.dto';
import { AddSynergyDto } from './dto/request/add-synergy.dto';

@Injectable()
export class HeroesService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    // Get all
    async getHeroes() {
        const hero = await this.prisma.heroes.findMany({
            select: {
                hero_id: true,
                hero_image: true,
                hero_name: true,
                recommend_road_name: true,
                main_job_name: true,
                hot: true,
            }
        });
        return hero;
    }

    // Get One
    async getHero(id: number) {
        const hero = await this.prisma.heroes.findFirst({
            select: {
                hero_id: true,
                hero_name: true,
                main_job_name: true,
                recommend_road_name: true,
                hero_world_icon: true,
                hero_image: true,
                hot: true,
                win_rate: true,
                match_rate: true,
                ban_rate: true,
                hero_skills: {
                    select: {
                        skill_id: true,
                        skill_name: true,
                        skill_desc: true,
                        skill_icon: true,
                        skill_tags: true,
                    }
                }
            },
            where: {
                hero_id: id
            }
        });

        if (!hero) {
            throw new NotFoundException(`Hero with ID ${id} not found`);
        }

        return hero;
    }

    // get hero counters
    async getHeroCounters(id: number) {
        return this.prisma.hero_counters.findMany({
            where: { hero_id: id },
            include: {
                heroes_hero_counters_counter_idToheroes: {
                    select: {
                        hero_name: true,
                        main_job_name: true,
                    }
                }
            }
        })
    }

    // add hero counters
    async addHeroCounter(heroId: number, dto: AddCounterDto) {
        return this.prisma.hero_counters.create({
            data: {
                hero_id: heroId,
                counter_id: dto.counter_id,
                reason: dto.reason,
            }
        });
    }

    // get hero synergies
    async getHeroSynergies(id: number) {
        return this.prisma.hero_synergies.findMany({
            where: { hero_id: id },
            include: {
                heroes_hero_synergies_synergy_idToheroes: {
                    select: {
                        hero_name: true,
                        main_job_name: true
                    }
                }
            }
        });
    }

    // add hero synergies
    async addHeroSynergy(heroId: number, dto: AddSynergyDto) {
        return this.prisma.hero_synergies.create({
            data: {
                hero_id: heroId,
                synergy_id: dto.synergy_id,
                reason: dto.reason,
            }
        });
    }

}
