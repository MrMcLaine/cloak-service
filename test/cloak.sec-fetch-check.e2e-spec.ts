import { INestApplication, HttpStatus } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import {
    partialSecFetchHeaders,
    validHeadersWithoutSecFetch,
    validIps,
    validPartialSecFetchHeaders,
} from './__data__';

describe('CloakController (e2e) – Sec-Fetch headers checks', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should detect bot when all sec-fetch headers are missing', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: validHeadersWithoutSecFetch,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(true);
        expect(res.body.reasons).toEqual(
            expect.arrayContaining([expect.stringMatching(/sec-fetch/i)])
        );
    });

    it('should detect bot when only one sec-fetch header is present', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: partialSecFetchHeaders,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(true);
        expect(res.body.reasons).toEqual(
            expect.arrayContaining([expect.stringMatching(/sec-fetch/i)])
        );
    });

    it('should NOT detect bot when 2 or more sec-fetch headers are present', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: validIps.MONTREAL_IP,
            headers: validPartialSecFetchHeaders,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(false);
    });
});
