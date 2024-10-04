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
exports.connectToDB = connectToDB;
// src/config/dbConfig.ts
const mongodb_1 = require("mongodb");
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            throw new Error('MONGO_URI is not defined in environment variables.');
        }
        const client = new mongodb_1.MongoClient(dbURI);
        yield client.connect();
        const db = client.db();
        console.log('Connected to MongoDB');
        return db;
    });
}
