import { botReasons } from '../constants';

export const acceptLanguageCheckUtil = (
    acceptLanguage?: string
): string | null => {
    const MINIMAL_ACCEPT_LANGUAGE_LENGTH = 2;

    if (
        !acceptLanguage ||
        acceptLanguage.length < MINIMAL_ACCEPT_LANGUAGE_LENGTH
    ) {
        return botReasons.MISSING_ACCEPT_LANGUAGE;
    }

    return null;
};
