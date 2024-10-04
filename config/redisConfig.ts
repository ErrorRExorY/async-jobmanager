// src/config/redisConfig.ts
import Redis from 'ioredis';

export function connectToRedis(): Redis {
  const redisURI = process.env.REDIS_URI;

  if (!redisURI) {
    throw new Error('REDIS_URI is not defined in environment variables.');
  }

  const redis = new Redis(redisURI);
  console.log('Connected to Redis');
  return redis;
}
