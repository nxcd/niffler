"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const v1_1 = __importDefault(require("uuid/v1"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
function factory({ bucket, maxUploadSize, endpoint, signedUrlTtl, credentials: { accessKeyId, secretAccessKey } }) {
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
        metadata: (_req, file, cb) => cb(null, {
            name: path_1.default.basename(file.originalname),
            enconding: file.encoding
        }),
        contentType: (_req, file, cb) => {
            return cb(null, mime_types_1.default.lookup(file.originalname) || multer_s3_1.default.AUTO_CONTENT_TYPE.toString());
        }
    });
    const upload = multer_1.default({ storage });
    return { upload };
}
exports.factory = factory;
