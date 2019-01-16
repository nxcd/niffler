"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require('sugar-env');
exports.config = {
    storage: {
        signedUrlTtl: parseInt(env.get('STORAGE_SIGNEDURL_TTL', 3000)),
        bucket: env.get('STORAGE_BUCKET'),
        credentials: {
            accessKeyId: env.get('STORAGE_CREDENTIALS_ACCESS_KEY_ID'),
            secretAccessKey: env.get('STORAGE_CREDENTIALS_SECRET_ACCESS_KEY')
        },
        endpoint: env.get('STORAGE_ENDPOINT'),
    },
    multer: {
        maxUploadSize: parseInt(env.get('STORAGE_MAX_UPLOAD_SIZE', 5 * 1024 * 1024))
    }
};
