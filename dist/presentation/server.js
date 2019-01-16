"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { server } = require('@expresso/expresso');
const app_1 = require("./app");
const app_config_1 = require("../app-config");
function start() {
    server.start(app_1.app, app_config_1.config);
}
exports.start = start;
