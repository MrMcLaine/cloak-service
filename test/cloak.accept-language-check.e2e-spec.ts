import { botReasons } from '../src/cloak/constants';
import { acceptLanguageCheckUtil } from '../src/cloak/utils';
import { testAcceptLanguages } from './__data__';

describe('acceptLanguageCheckUtil', () => {
    it('should return reason if accept-language header is missing', () => {
        expect(acceptLanguageCheckUtil(testAcceptLanguages.UNDEFINED)).toBe(
            botReasons.MISSING_ACCEPT_LANGUAGE
        );
        expect(acceptLanguageCheckUtil(testAcceptLanguages.EMPTY_STRING)).toBe(
            botReasons.MISSING_ACCEPT_LANGUAGE
        );
    });

    it('should return reason if accept-language header is too short', () => {
        expect(acceptLanguageCheckUtil(testAcceptLanguages.INVALID)).toBe(
            botReasons.MISSING_ACCEPT_LANGUAGE
        );
    });

    it('should return null for valid accept-language', () => {
        expect(
            acceptLanguageCheckUtil(testAcceptLanguages.VALID_MIN)
        ).toBeNull();
        expect(
            acceptLanguageCheckUtil(testAcceptLanguages.VALID_LARGE)
        ).toBeNull();
    });
});
