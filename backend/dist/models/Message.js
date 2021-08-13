"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var MessageSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        name: String
    },
    text: String,
    time: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model("Message", MessageSchema);
//# sourceMappingURL=Message.js.map