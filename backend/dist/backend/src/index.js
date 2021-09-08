"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const socket_1 = __importDefault(require("./socket"));
const main = () => {
    const PORT = process.env.PORT || 8080;
    socket_1.default.listen(PORT, () => {
        console.log(`Back end server started on port ${PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map