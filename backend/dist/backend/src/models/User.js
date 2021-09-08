"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
var userSchema = new database_1.default.Schema({
    githubId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: false
    },
    rooms: [
        {
            type: database_1.default.Schema.Types.ObjectId,
            ref: "Rooms"
        }
    ]
});
module.exports = database_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map