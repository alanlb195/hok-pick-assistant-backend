import { ApiProperty } from '@nestjs/swagger';

export class HeroResponseDto {

  @ApiProperty({ example: '123' })
  id: number;

  @ApiProperty({ example: 'Aeron' })
  name: string;

  @ApiProperty({ example: 'AGUDO.webp' })
  image: string;
  
  @ApiProperty({ example: 'Tanque' })
  mainJob: string;
  
  @ApiProperty({ example: 'Cazador' })
  recommendRoad: string;

}
