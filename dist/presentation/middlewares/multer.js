"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
function upload(storage, { maxUploadSize }) {
    return multer_1.default({ storage, limits: { fileSize: maxUploadSize } })
        .single('file');
}
exports.upload = upload;
exports.default = { upload };
