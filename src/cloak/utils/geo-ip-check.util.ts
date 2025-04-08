import * as geoip from 'geoip-lite';
import { botReasons } from '../constants';

export const geoIpCheckUtil = (ip: string): string | null => {
    const geo = geoip.lookup(ip);

    if (!geo) {
        return botReasons.UNKNOWN_IP_GEOLOCATION;
    }

    const { region, city } = geo;

    if (!city && !region) {
        return `${botReasons.SUSPICIOUS_GEOLOCATION}: "${JSON.stringify(geo)}"`;
    }

    return null;
};
