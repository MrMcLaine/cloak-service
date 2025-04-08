import { botReasons } from '../constants';

const IPV4_PRIVATE_RANGE_PATTERNS = [
    /^127\./,
    /^10\./,
    /^192\.168\./,
    /^172\.(1[6-9]|2\d|3[0-1])\./,
    /^0\./,
];

const IPV6_PRIVATE_RANGE_PATTERNS = [/^::1$/, /^fc00:/, /^fe80:/];

const LOCALHOST_PATTERNS = [/^localhost$/];

export const privateOrLocalIpCheckUtil = (ip: string): string | null => {
    const ALL_PATTERNS = [
        ...IPV4_PRIVATE_RANGE_PATTERNS,
        ...IPV6_PRIVATE_RANGE_PATTERNS,
        ...LOCALHOST_PATTERNS,
    ];

    const isPrivateOrLocal = ALL_PATTERNS.some((pattern) => pattern.test(ip));

    return isPrivateOrLocal
        ? `${botReasons.LOCAL_OR_PRIVATE_IP}: "${ip}"`
        : null;
};
