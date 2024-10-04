// src/jobs/dataProcessingJob.ts
import { Job } from '../utils/jobQueue';

export const dataProcessingJob: Job = {
  id: 'data-002',
  name: 'ProcessData',
  weight: 4,
  createdAt: new Date(),
  execute: async () => {
    const data = [1, 2, 3, 4, 5];
    const processedData = data.map(num => num * 2);
    console.log('Data processed:', processedData);
  },
};
