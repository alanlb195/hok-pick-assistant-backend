import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsNumber()
    PORT: number;

    @IsString()
    GEMINI_API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(
            `❌ Environment validation error:\n${errors
                .map((e) => Object.values(e.constraints ?? {}).join('\n'))
                .join('\n')}`,
        );
    }

    return validatedConfig;
}
