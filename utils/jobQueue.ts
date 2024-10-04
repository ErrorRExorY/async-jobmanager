// src/utils/jobQueue.ts
export interface Job<T = void> {
  id: string;
  name: string;
  execute: (params: T) => Promise<void>;
  weight: number;
  createdAt: Date;
}
