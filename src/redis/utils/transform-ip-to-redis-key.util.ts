import { RedisKeysStat } from '../constants';

export const transformIpToRedisKey = (ip: string): string => {
    return `${RedisKeysStat.RATE_LIMIT}:${ip}`;
};
