import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { HeroResponseDto } from './dto/response/hero.response.dto';
import { AddCounterDto } from './dto/request/add-counter.dto';
import { AddSynergyDto } from './dto/request/add-synergy.dto';

@Controller('heroes')
export class HeroesController {

  constructor(
    private readonly heroesService: HeroesService,
  ) { }

  @Get()
  getHeroes() {
    return this.heroesService.getHeroes();
  }


  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: HeroResponseDto })
  getHero(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.heroesService.getHero(id);
  }


  // Hero counter section
  @Get(':id/counters')
  getHeroCounters(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.heroesService.getHeroCounters(id);
  }

  @Post(':id/counters')
  addHeroCounter(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddCounterDto
  ) {
    return this.heroesService.addHeroCounter(id, dto);
  }


  // Hero synergies section
  @Get(':id/synergies')
  getHeroSynergies(@Param('id', ParseIntPipe) id: number) {
    return this.heroesService.getHeroSynergies(id);
  }


  @Post(':id/synergies')
  addHeroSynergy(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddSynergyDto
  ) {
    return this.heroesService.addHeroSynergy(id, dto);
  }


}
