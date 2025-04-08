import { botReasons } from '../constants';

export function refererCheckUtil(referer?: string): string | null {
    if (!referer || referer.trim() === '') {
        return botReasons.MISSING_REFERER;
    }

    return null;
}
