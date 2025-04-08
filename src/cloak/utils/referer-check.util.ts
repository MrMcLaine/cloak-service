import { botReasons } from '../constants';

const SUSPICIOUS_REFERER_PATTERNS = [
    /^http:\/\/localhost/i,
    /^http:\/\/127\.0\.0\.1/i,
    /^http:\/\/192\.168\./i,
    /^http:\/\/10\./i,
    /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\./i,
];

export const refererCheckUtil = (referer?: string): string | null => {
    if (!referer || referer.trim() === '') {
        return botReasons.MISSING_REFERER;
    }

    for (const pattern of SUSPICIOUS_REFERER_PATTERNS) {
        if (pattern.test(referer)) {
            return `${botReasons.SUSPICIOUS_REFERER}: "${referer}"`;
        }
    }

    return null;
};
