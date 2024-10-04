// src/utils/jobManager.ts
import { Db } from 'mongodb';
import Redis from 'ioredis';
import { Job } from './jobQueue';
import { connectToDB } from '../config/dbConfig';
import { connectToRedis } from '../config/redisConfig';

export class JobManager {
  private db: Db | null = null;
  private redis: Redis | null = null;
  private jobQueue: Job<any>[] = [];

  constructor() {}

  // Initialisiere Datenbank-Verbindung basierend auf ENV-Variablen
  async connectToDatabase(type: 'mongo' | 'redis') {
    if (type === 'mongo') {
      this.db = await connectToDB();
    } else if (type === 'redis') {
      this.redis = connectToRedis();
    }
  }

  // Job hinzufügen und in DB speichern
  async addJob(job: Job<any>) {
    this.jobQueue.push(job);
    this.jobQueue.sort((a, b) => b.weight - a.weight);

    if (this.db) {
      const collection = this.db.collection('jobs');
      await collection.insertOne(job);
      console.log(`Job ${job.name} added to MongoDB.`);
    }

    if (this.redis) {
      await this.redis.lpush('jobs', JSON.stringify(job));
      console.log(`Job ${job.name} added to Redis.`);
    }
  }

  // Job abarbeiten und aus DB/Redis entfernen
  async runNextJob(params: any) {
    const nextJob = this.jobQueue.shift();

    if (nextJob) {
      console.log(`Running job: ${nextJob.name}`);
      await nextJob.execute(params);

      if (this.db) {
        const collection = this.db.collection('jobs');
        await collection.deleteOne({ id: nextJob.id });
      }

      if (this.redis) {
        await this.redis.lrem('jobs', 1, JSON.stringify(nextJob));
      }
    }
  }

  // Alle Jobs ausführen
  async runAllJobs(params: any) {
    while (this.jobQueue.length > 0) {
      await this.runNextJob(params);
    }
  }
}
