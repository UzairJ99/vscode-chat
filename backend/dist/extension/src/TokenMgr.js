"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMgr = void 0;
class TokenMgr {
    static setToken(token) {
        return this.globalState.update("vsChatToken", token);
    }
    static getToken() {
        return this.globalState.get("vsChatToken");
    }
}
exports.TokenMgr = TokenMgr;
//# sourceMappingURL=TokenMgr.js.map