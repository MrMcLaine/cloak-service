import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import { privateIps, validBrowserHeaders, validIps } from './__data__';

describe('CloakController (e2e) – IP detection', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it.each(privateIps)(
        'should detect bot for private/local IP: %s',
        async (ip) => {
            const res = await sendCloakCheckRequest(app, {
                ip,
                headers: validBrowserHeaders,
            });

            expect(res.status).toBe(HttpStatus.CREATED);
            expect(res.body.isBot).toBe(true);
            expect(res.body.reasons).toEqual(
                expect.arrayContaining([expect.stringMatching(/ip/i)])
            );
        }
    );

    it('should NOT detect bot for public IP', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: validBrowserHeaders,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
