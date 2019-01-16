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
const routes_1 = require("./routes");
const multerS3_1 = __importDefault(require("./lib/multerS3"));
const middlewares_1 = __importDefault(require("./middlewares"));
exports.app = expresso((app, config) => __awaiter(this, void 0, void 0, function* () {
    const { storage } = multerS3_1.default.factory(Object.assign({}, config.storage));
    const multerMiddlewareUpload = middlewares_1.default.multer.upload(storage, Object.assign({}, config.multer));
    app.post('/', routes_1.routes.upload.factory(multerMiddlewareUpload));
}));
