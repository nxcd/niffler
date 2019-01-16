"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rescue = require('express-rescue');
const { HttpError } = require('@expresso/expresso');
function factory(uploadMinioMidleware) {
    return ([
        uploadMinioMidleware,
        rescue(function uploadRoute(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!req.file) {
                    throw new HttpError.UnprocessableEntity({ message: 'missing file' });
                }
                res.status(201)
                    .json({ id: req.file.key });
            });
        })
    ]);
}
exports.factory = factory;
