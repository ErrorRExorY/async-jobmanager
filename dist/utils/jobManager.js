"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobManager = void 0;
const dbConfig_1 = require("../config/dbConfig");
const redisConfig_1 = require("../config/redisConfig");
class JobManager {
    constructor() {
        this.db = null;
        this.redis = null;
        this.jobQueue = [];
    }
    // Initialisiere Datenbank-Verbindung basierend auf ENV-Variablen
    connectToDatabase(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === 'mongo') {
                this.db = yield (0, dbConfig_1.connectToDB)();
            }
            else if (type === 'redis') {
                this.redis = (0, redisConfig_1.connectToRedis)();
            }
        });
    }
    // Job hinzufügen und in DB speichern
    addJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            this.jobQueue.push(job);
            this.jobQueue.sort((a, b) => b.weight - a.weight);
            if (this.db) {
                const collection = this.db.collection('jobs');
                yield collection.insertOne(job);
                console.log(`Job ${job.name} added to MongoDB.`);
            }
            if (this.redis) {
                yield this.redis.lpush('jobs', JSON.stringify(job));
                console.log(`Job ${job.name} added to Redis.`);
            }
        });
    }
    // Job abarbeiten und aus DB/Redis entfernen
    runNextJob(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextJob = this.jobQueue.shift();
            if (nextJob) {
                console.log(`Running job: ${nextJob.name}`);
                yield nextJob.execute(params);
                if (this.db) {
                    const collection = this.db.collection('jobs');
                    yield collection.deleteOne({ id: nextJob.id });
                }
                if (this.redis) {
                    yield this.redis.lrem('jobs', 1, JSON.stringify(nextJob));
                }
            }
        });
    }
    // Alle Jobs ausführen
    runAllJobs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.jobQueue.length > 0) {
                yield this.runNextJob(params);
            }
        });
    }
}
exports.JobManager = JobManager;
