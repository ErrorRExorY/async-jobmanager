// src/jobs/backupJob.ts
import fs from 'fs/promises';
import { Job } from '../utils/jobQueue';

export const backupJob: Job = {
  id: 'backup-001',
  name: 'BackupFiles',
  weight: 3,
  createdAt: new Date(),
  execute: async () => {
    try {
      await fs.copyFile('/path/to/source', '/path/to/destination');
      console.log('Backup completed successfully.');
    } catch (error) {
      console.error('Backup failed:', error);
    }
  },
};
