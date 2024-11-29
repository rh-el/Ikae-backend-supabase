"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
// call the router module with the express server
(0, routes_1.default)(app);
app.get('/debug-env', (req, res) => {
    res.send({ secretKey: process.env.TOKEN_SECRET || 'undefined' });
});
// used to serve images stored locally 
//app.use(express.static('app'))
// app.use('/img', express.static('img'))
// launch request listener on port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
