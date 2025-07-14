import { ApiProperty } from '@nestjs/swagger';

export class HeroResponseDto {

  @ApiProperty({ example: '123' })
  hero_id: number;

  @ApiProperty({ example: 'Aeron' })
  hero_name: string;

  @ApiProperty({ example: 'https://cdn.../aeron.png' })
  icon: string;

  @ApiProperty({ example: 'hero_images/AGUDO.png' })
  hero_image: string;
  
  @ApiProperty({ example: 'Tanque' })
  main_job_name: string;
}
