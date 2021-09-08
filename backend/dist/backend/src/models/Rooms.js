"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
var RoomSchema = new database_1.default.Schema({
    name: String,
    users: [
        {
            types: database_1.default.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            types: database_1.default.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});
module.exports = database_1.default.model("Room", RoomSchema);
//# sourceMappingURL=Rooms.js.map