"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express_1.default();
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (_req, res) => {
    res.send("HI");
});
app.post('/sendMessage', (req, res) => {
    let message = req.body;
    console.log(message);
    res.send(message);
});
exports.default = app;
//# sourceMappingURL=routes.js.map