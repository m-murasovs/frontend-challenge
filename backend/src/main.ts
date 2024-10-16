import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useBodyParser('json', { limit: '10mb' });
    app.enableCors();
    await app.listen(5001);
}
bootstrap();
