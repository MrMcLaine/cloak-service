import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Cloak Service')
    .setDescription('API documentation for Cloak detection')
    .setVersion('1.0')
    .build();
