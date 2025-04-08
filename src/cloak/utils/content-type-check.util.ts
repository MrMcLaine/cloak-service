import { BLOCKED_CONTENT_TYPES, botReasons } from '../constants';

export const contentTypeCheckUtil = (contentType?: string): string | null => {
    const value = contentType?.toLowerCase().split(';')[0] ?? '';

    if (BLOCKED_CONTENT_TYPES.includes(value)) {
        return `${botReasons.SUSPICIOUS_CONTENT_TYPE}: "${value}"`;
    }

    return null;
};
