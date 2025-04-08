import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import { botUserAgents, validBrowserHeaders, validIps } from './__data__';

describe('CloakController (e2e) – User-Agent detection', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it.each(botUserAgents)(
        'should detect bot User-Agent: %s',
        async (userAgent) => {
            const res = await sendCloakCheckRequest(app, {
                ip: validIps.MONTREAL_IP,
                headers: { 'User-Agent': userAgent },
            });

            expect(res.status).toBe(HttpStatus.CREATED);
            expect(res.body.isBot).toBe(true);
            expect(res.body.reasons).toEqual(
                expect.arrayContaining([expect.stringMatching(/User-Agent/i)])
            );
        }
    );

    it('should NOT detect bot for a legitimate User-Agent', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: validBrowserHeaders,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
