import { botReasons, headerKeys } from '../constants';

export const secFetchHeadersCheckUtil = (
    headers: Record<string, any>
): string | null => {
    const MIN_SEC_FETCH_PRESENCE = 2;

    const hasSecFetchMode = !!headers[headerKeys.SEC_FETCH_MODE];
    const hasSecFetchSite = !!headers[headerKeys.SEC_FETCH_SITE];
    const hasSecFetchUser = !!headers[headerKeys.SEC_FETCH_USER];

    const presentCount = [
        hasSecFetchMode,
        hasSecFetchSite,
        hasSecFetchUser,
    ].filter(Boolean).length;

    return presentCount < MIN_SEC_FETCH_PRESENCE
        ? botReasons.MISSING_SEC_FETCH_HEADERS
        : null;
};
