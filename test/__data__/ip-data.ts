export const testIps = {
    UNDEFINED: undefined,
    NOT_AN_IP_STRING: 'not.an.ip',
    EMPTY_STRING: '',
    NUMBER_FORMAT: 12345,
    INVALID_ZERO: '0.0.0.0',
    GOOGLE_DNS: '8.8.8.8',
};

export const validIps = {
    NEW_YORK_IP: '72.229.28.185',
    MONTREAL_IP: '24.48.0.1',
};

export const privateIps = [
    '127.0.0.1',
    '192.168.1.1',
    '10.0.0.1',
    '172.16.0.1',
    '172.31.255.255',
    '::1',
    'fc00::1',
    'fe80::1',
];
