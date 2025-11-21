// src/gemini/dto/request/analyze-image.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeImageDto {
    @IsString()
    @IsNotEmpty()
    base64Image: string;

    @IsString()
    @IsNotEmpty()
    prompt: string;
}
