import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsNumber, IsString, Max, Min } from "class-validator";

export class GeneratePickDto {

    @ApiProperty({
        description: 'Position in selection order (between 1 to 10)',
        example: 3,
        minimum: 1,
        maximum: 10,
    })
    @IsNumber()
    @Min(1)
    @Max(10)
    position: number;

    @ApiProperty({
        description: 'List of allied heroes already selected',
        example: ['Lu Bu', 'Yao'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    allies: string[];

    @ApiProperty({
        description: 'List of enemy heroes already selected',
        example: ['Zhao Yun', 'Angela'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    enemies: string[];

    @ApiProperty({
        description: 'Language in which the recommendation is desired',
        example: 'spanish',
    })
    @IsString()
    language: string;


    @ApiProperty({
        description: 'Role assigned for the game. This affects the type of recommendation (top, mid, jungle, adc, support)',
        example: 'jungle',
        enum: ['top', 'mid', 'jungle', 'adc', 'support'],
    })
    @IsString()
    @IsIn(['top', 'mid', 'jungle', 'adc', 'support'])
    role: string;
}
