import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import {
    headersWithoutConnection,
    validBrowserHeaders,
    validIps,
} from './__data__';

describe('CloakController (e2e) – Connection header checks', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should detect bot when connection header is missing', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: headersWithoutConnection,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(true);
        expect(res.body.reasons).toEqual(
            expect.arrayContaining([expect.stringMatching(/connection/i)])
        );
    });

    it('should detect bot for suspicious connection value', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: {
                ...validBrowserHeaders,
                connection: 'close',
            },
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(true);
        expect(res.body.reasons).toEqual(
            expect.arrayContaining([expect.stringMatching(/connection/i)])
        );
    });

    it('should NOT detect bot for "keep-alive" connection', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: validBrowserHeaders,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
