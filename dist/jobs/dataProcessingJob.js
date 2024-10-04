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
exports.dataProcessingJob = void 0;
exports.dataProcessingJob = {
    id: 'data-002',
    name: 'ProcessData',
    weight: 4,
    createdAt: new Date(),
    execute: () => __awaiter(void 0, void 0, void 0, function* () {
        const data = [1, 2, 3, 4, 5];
        const processedData = data.map(num => num * 2);
        console.log('Data processed:', processedData);
    }),
};
