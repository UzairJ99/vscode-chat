"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
auth_1.app.post('/sendMessage', (req, res) => {
    let message = req.body;
    console.log(message);
    res.send(message);
});
exports.default = auth_1.app;
//# sourceMappingURL=sendMessage.js.map