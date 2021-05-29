"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var User = new mongoose_1.default.Schema({
    githubId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=User.js.map