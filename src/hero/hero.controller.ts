import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HeroService } from './hero.service';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { HeroResponseDto } from './dto/response/hero.response.dto';

@Controller('heroes')
export class HeroController {

  constructor(
    private readonly heroesService: HeroService,
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

}
