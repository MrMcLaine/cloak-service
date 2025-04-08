import { botReasons } from '../src/cloak/constants';
import { geoIpCheckUtil } from '../src/cloak/utils';
import { testIps, validIps } from './__data__';

describe('geoIpCheckUtil', () => {
    it('should return UNKNOWN_IP_GEOLOCATION if geo lookup fails', () => {
        const result = geoIpCheckUtil(testIps.INVALID_ZERO);

        expect(result).toBe(botReasons.UNKNOWN_IP_GEOLOCATION);
    });

    it('should return SUSPICIOUS_GEOLOCATION if both city and region are missing', () => {
        const result = geoIpCheckUtil(testIps.GOOGLE_DNS);

        expect(result).toMatch(botReasons.SUSPICIOUS_GEOLOCATION);
    });

    it('should return null if geo data is valid (city or region exists)', () => {
        const result = geoIpCheckUtil(validIps.MONTREAL_IP);

        expect(result).toBeNull();
    });
});
