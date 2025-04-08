export const botUserAgents = [
    'curl/7.77.0',
    'python-requests/2.25.1',
    'axios/0.27.2',
    'node-fetch/1.0',
    'PostmanRuntime/7.26.8',
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Java/1.8.0_181',
    'Selenium/3.141.59',
    'facebookexternalhit/1.1',
    'Go-http-client/1.1',
];

export const validUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36';

export const validAcceptLanguage = 'en-US,en;q=0.9';
export const validConnection = 'keep-alive';
export const validReferer = 'https://example.com';
export const validSecFetchSite = 'same-origin';
export const validSecFetchUser = '?1';
export const validSecFetchMode = 'navigate';
export const validContentType = 'application/json';

export const validBrowserHeaders = {
    'User-Agent': validUserAgent,
    'accept-language': validAcceptLanguage,
    connection: validConnection,
    referer: validReferer,
    'sec-fetch-site': validSecFetchSite,
    'sec-fetch-user': validSecFetchUser,
    'sec-fetch-mode': validSecFetchMode,
    'content-type': validContentType,
};
