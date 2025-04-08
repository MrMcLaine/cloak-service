import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './swagger.config';

const SWAGGER_API_PATH = 'api';

export const setupSwagger = (app: INestApplication): void => {
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(SWAGGER_API_PATH, app, document);
};
