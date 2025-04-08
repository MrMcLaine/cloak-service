import { validBrowserHeaders } from './test-user-agents';

export const validHeadersWithoutSecFetch = { ...validBrowserHeaders };
delete validHeadersWithoutSecFetch['sec-fetch-site'];
delete validHeadersWithoutSecFetch['sec-fetch-mode'];
delete validHeadersWithoutSecFetch['sec-fetch-user'];

export const partialSecFetchHeaders = {
    ...validHeadersWithoutSecFetch,
    'sec-fetch-mode': 'navigate',
};

export const validPartialSecFetchHeaders = {
    ...validHeadersWithoutSecFetch,
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
};
