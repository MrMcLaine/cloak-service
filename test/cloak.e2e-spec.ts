import { HttpStatus, INestApplication } from '@nestjs/common';
import { createTestApp, sendCloakCheckRequest } from './helpers';
import { testIps } from './__data__';

describe('CloakController (e2e) – Body validation', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = await createTestApp();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should reject when body is empty', async () => {
        const res = await sendCloakCheckRequest(app, {});

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should reject when ip field is missing', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: testIps.UNDEFINED,
        });

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should reject when ip is not a valid string (e.g. "not.an.ip")', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: testIps.NOT_AN_IP_STRING,
        });

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should reject when ip is an empty string', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: testIps.EMPTY_STRING,
        });

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should reject when ip is a number', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: testIps.NUMBER_FORMAT,
        });

        expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should detect bot when valid IP is provided without headers', async () => {
        const res = await sendCloakCheckRequest(app, {
            ip: testIps.VALID_PUBLIC_GOOGLE,
        });

        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.isBot).toBe(true);
        expect(res.body.reasons.length).toBeGreaterThan(0);
    });
});
