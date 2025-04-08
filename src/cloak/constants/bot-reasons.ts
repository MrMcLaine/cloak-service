export const botReasons = {
    MISSING_ACCEPT_LANGUAGE: 'Missing or suspicious Accept-Language header',
    MISSING_CONNECTION_HEADER: 'Missing or suspicious Connection header',
    MISSING_REFERER: 'Missing Referer header',
    MISSING_SEC_FETCH_HEADERS: 'Missing or incomplete sec-fetch headers',
    SUSPICIOUS_CONTENT_TYPE: 'Unexpected or missing Content-Type header',
    SUSPICIOUS_GEOLOCATION: 'IP has suspicious or generic geo location',
    SUSPICIOUS_USER_AGENT: 'User-Agent includes suspicious keyword',
    UNKNOWN_IP_GEOLOCATION: 'GeoIP lookup failed for IP',
};
