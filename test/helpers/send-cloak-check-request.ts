import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Routes } from '../../src/common/constants';

interface CloakCheckOptions {
    ip?: any;
    headers?: Record<string, any>;
}

export const sendCloakCheckRequest = async (
    app: INestApplication,
    options: CloakCheckOptions
): Promise<request.Response> => {
    const { ip, headers = {} } = options;

    const req = request(app.getHttpServer())
        .post(`${Routes.CLOAK.BASE}${Routes.CLOAK.check}`)
        .send({ ip });

    Object.entries(headers).forEach(([key, value]) => {
        req.set(key, value);
    });

    return req;
};
