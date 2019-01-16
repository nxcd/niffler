"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StorageError_1 = require("./StorageError");
const NO_FILE_UPLOADED = 'A file upload is required';
class NoFileUploadedError extends StorageError_1.StorageError {
    constructor() {
        super(NO_FILE_UPLOADED);
    }
}
exports.NoFileUploadedError = NoFileUploadedError;
