"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// check validity of a token
function authenticateToken(req, res, next) {
    dotenv_1.default.config();
    const authHeader = req.headers['authorization'];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, email) => {
        console.log('USER', email);
        if (err)
            return res.sendStatus(403);
        req.email = email;
        next();
    });
}
