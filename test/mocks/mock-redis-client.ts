export const MockRedisClient = {
    connect: jest.fn(),
    incr: jest.fn().mockResolvedValue(1),
    ttl: jest.fn().mockResolvedValue(-1),
    expire: jest.fn().mockResolvedValue(1),
    multi: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([
        [null, 1],
        [null, -1],
    ]),
    get: jest.fn(() => Promise.resolve(null)),
    set: jest.fn(() => {
        return Promise.resolve('OK');
    }),
};
