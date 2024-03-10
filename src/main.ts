import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerFilePath = resolve(__dirname, '../doc/api.yaml');
  const swaggerFileData = await readFile(swaggerFilePath);
  const stringifiedSwaggerData = String(swaggerFileData);
  const port = process.env.PORT || 4000;
  const document: OpenAPIObject = parse(stringifiedSwaggerData);
  document.servers = [{ url: `http://localhost:${port}` }];
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
}
bootstrap();
