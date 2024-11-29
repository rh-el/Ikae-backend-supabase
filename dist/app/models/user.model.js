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
const db_1 = __importDefault(require("./db"));
class User {
    constructor(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }
}
User.createNewUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('users')
        .insert([newUser])
        .select();
    if (error)
        throw new Error(error.message);
    return yield data;
});
User.checkUserInDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('users')
        .select(`*`)
        .eq('email', email)
        .single();
    if (data === null) {
        return true;
    }
    else {
        return false;
    }
});
User.getStoredPassword = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('users')
        .select(`password`)
        .eq('email', userEmail)
        .single();
    if (error)
        throw new Error(error.message);
    return data.password;
});
User.getIdFromEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield db_1.default
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();
    if (error)
        throw new Error(error.message);
    return data.id;
});
exports.default = User;
