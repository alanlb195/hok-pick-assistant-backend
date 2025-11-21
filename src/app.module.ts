import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/configuration';
import { GeminiModule } from './gemini/gemini.module';
import { PrismaModule } from './prisma/prisma.module';
import { HeroModule } from './hero/hero.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
      serveRoot: '/api/static',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    // Global Gemini AI Client
    GeminiModule,

    PrismaModule,

    HeroModule,

    SeedModule,

    FilesModule,

  ], controllers: [],
  providers: [],
})
export class AppModule { }
