import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from 'src/common/helpers';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
    constructor(private readonly configService: ConfigService) { }

    @Post('hero')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter,
            storage: diskStorage({
                destination: './static/heroes',
                filename: fileNamer,
            }),
        }),
    )
    uploadHeroImage(@UploadedFile() file: Express.Multer.File) {
        if (!file)
            throw new BadRequestException('Make sure that the file is an image');

        const secureUrl = `${this.configService.get(
            'HOST_API',
        )}/api/static/heroes/${file.filename}`;

        return {
            secureUrl,
            fileName: file.filename,
        };
    }
}
