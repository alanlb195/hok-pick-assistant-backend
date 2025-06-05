import { IsArray, IsIn, IsNumber, IsString, Max, Min } from "class-validator";

export class GeneratePickDto {

    @IsNumber()
    @Min(1)
    @Max(10)
    position: number;

    @IsArray()
    @IsString({ each: true })
    allies: string[];

    @IsArray()
    @IsString({ each: true })
    enemies: string[];

    @IsString()
    language: string;

    @IsString()
    @IsIn(['top', 'mid', 'jungle', 'adc', 'support'])
    role: string;
}
