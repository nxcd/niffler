"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const mime_types_1 = require("mime-types");
const NoFileUploadedError_1 = require("./errors/NoFileUploadedError");
class StorageService {
    constructor({ bucket, credentials: { accessKeyId, secretAccessKey }, endpoint, maxUploadSize, signedUrlTtl }) {
        const s3 = new s3_1.default({
            endpoint,
            accessKeyId,
            secretAccessKey,
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        });
        const storage = multer_s3_1.default({
            s3,
            bucket,
            key: (_req, _file, cb) => cb(null, v1_1.default()),
            metadata: (_req, file, cb) => cb(null, { fieldName: file.fieldname }),
            contentType: (_req, file, cb) => {
                const contentType = (mime_types_1.lookup(file.originalname) || multer_s3_1.default.AUTO_CONTENT_TYPE).toString();
                return cb(null, contentType);
            }
        });
        this.multer = multer_1.default({ storage, limits: { fileSize: maxUploadSize } });
    }
    upload(fieldName) {
        const upload = this.multer.single(fieldName);
        return function updloadMiddleware(req, _res, next) {
            if (!req.file) {
                return next(new NoFileUploadedError_1.NoFileUploadedError());
            }
            return next();
        };
    }
}
exports.StorageService = StorageService;
