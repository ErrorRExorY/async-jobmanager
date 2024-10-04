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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupJob = void 0;
// src/jobs/backupJob.ts
const promises_1 = __importDefault(require("fs/promises"));
exports.backupJob = {
    id: 'backup-001',
    name: 'BackupFiles',
    weight: 3,
    createdAt: new Date(),
    execute: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield promises_1.default.copyFile('/path/to/source', '/path/to/destination');
            console.log('Backup completed successfully.');
        }
        catch (error) {
            console.error('Backup failed:', error);
        }
    }),
};
