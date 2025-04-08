import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import {
    headersWithoutContentType,
    validBrowserHeaders,
    validIps,
} from './__data__';

describe('CloakController (e2e) – Content-Type header detection', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should NOT detect bot for a valid Content-Type', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: {
                ...validBrowserHeaders,
                'content-type': 'application/json',
            },
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });

    it('should NOT detect bot when Content-Type is missing', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: headersWithoutContentType,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
