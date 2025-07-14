import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ChatHistoryEntry {
    @ApiProperty({
        description: 'Quién habla en esta línea del historial',
        example: 'user',
        enum: ['user', 'model'],
    })
    @IsString()
    role: 'user' | 'model';

    @ApiProperty({
        description: 'Contenido del mensaje del usuario o del modelo',
        example: '¿Qué héroe puedo usar para hacer sinergia con Luban No.7?',
    })
    @IsString()
    text: string;
}

export class InsightChatRecommendationDto {
    @ApiProperty({
        description: 'Historial de la conversación anterior con roles y mensajes',
        example: [
            {
                role: 'user',
                text: '¿Qué héroe hace buen combo con Yao?',
            },
            {
                role: 'model',
                text: 'Zhuangzi es una gran elección porque puede protegerla mientras se lanza al combate.',
            }
        ],
        type: [ChatHistoryEntry],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ChatHistoryEntry)
    history: ChatHistoryEntry[];

    @ApiProperty({
        description: 'Nuevo mensaje del usuario para continuar la conversación',
        example: '¿Y qué pasa si los enemigos tienen a Lü Bu?',
    })
    @IsString()
    message: string;
}
