"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const comparePasswords = (userPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.compare(userPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
});
const validateHeader = (header, fieldName) => {
    if (!header) {
        throw new Error(`No ${fieldName} provided in headers`);
    }
    return Array.isArray(header) ? header[0] : header;
};
const generateAuthToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "2days" });
};
const getHashedPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = validateHeader(req.headers.email, "email");
        const password = validateHeader(req.headers.password, 'password');
        const storedPassword = yield user_model_1.default.getStoredPassword(email);
        const isPasswordCorrect = yield comparePasswords(password, storedPassword);
        if (isPasswordCorrect) {
            const authToken = generateAuthToken(email);
            return res.status(200).json({
                message: "Login successful",
                token: authToken
            });
        }
        else {
            return res.status(401).json({ error: 'Invalid credentials ' });
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: error.message || 'an unexpected error occured during login'
        });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = validateHeader(req.body.firstname, 'firstname');
        const lastname = validateHeader(req.body.lastname, 'lastname');
        const username = validateHeader(req.body.username, 'username');
        const email = validateHeader(req.body.email, "email");
        const password = validateHeader(req.body.password, "password");
        const isUserInexistant = yield user_model_1.default.checkUserInDb(email);
        if (isUserInexistant) {
            const hashPassword = getHashedPassword(password);
            const newUser = new user_model_1.default({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: hashPassword
            });
            user_model_1.default.createNewUser(newUser);
            const authToken = generateAuthToken(email);
            return res.status(200).json({
                message: `User ${username} successfully registered`,
                token: authToken
            });
        }
        else {
            return res.status(401).json({ error: 'User already exists in db' });
        }
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            error: error.message || 'an unexpected error occured during registration'
        });
    }
});
exports.login = login;
exports.register = register;
