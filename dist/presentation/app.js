"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expresso = require('@expresso/expresso');
const routes_1 = __importDefault(require("./routes"));
const multerS3_1 = require("./lib/multerS3");
const Multer_1 = require("./middlewares/Multer");
exports.app = expresso((app, config) => __awaiter(this, void 0, void 0, function* () {
    const { storage } = multerS3_1.factory(Object.assign({}, config.storage));
    const multerMiddlewareUpload = Multer_1.upload(storage, Object.assign({}, config.multer));
    app.post('/', routes_1.default.upload.factory(multerMiddlewareUpload));
}));
