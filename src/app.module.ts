import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/configuration';
import { GeminiModule } from './gemini/gemini.module';
import { PrismaModule } from './prisma/prisma.module';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    GeminiModule,
    PrismaModule,
    HeroesModule,
  ], controllers: [],
  providers: [],
})
export class AppModule { }
