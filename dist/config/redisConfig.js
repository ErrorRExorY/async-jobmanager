"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRedis = connectToRedis;
// src/config/redisConfig.ts
const ioredis_1 = __importDefault(require("ioredis"));
function connectToRedis() {
    const redisURI = process.env.REDIS_URI;
    if (!redisURI) {
        throw new Error('REDIS_URI is not defined in environment variables.');
    }
    const redis = new ioredis_1.default(redisURI);
    console.log('Connected to Redis');
    return redis;
}
