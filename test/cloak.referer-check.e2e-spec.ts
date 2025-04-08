import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import {
    suspiciousReferers,
    validBrowserHeaders,
    validIps,
    validReferer,
} from './__data__';

describe('CloakController (e2e) – Referer checks', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it.each(suspiciousReferers)(
        'should detect suspicious referer: %s',
        async (referer) => {
            const headers = {
                ...validBrowserHeaders,
                referer,
            };

            const res = await sendCloakCheckRequest(app, {
                ip: validIps.MONTREAL_IP,
                headers,
            });

            expect(res.status).toBe(HttpStatus.CREATED);
            expect(res.body.isBot).toBe(true);
            expect(res.body.reasons).toEqual(
                expect.arrayContaining([expect.stringMatching(/Referer/i)])
            );
        }
    );

    it('should NOT detect bot for valid referer', async () => {
        const headers = {
            ...validBrowserHeaders,
            referer: validReferer,
        };

        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
