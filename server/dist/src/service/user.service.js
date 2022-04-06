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
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_shcema_1 = require("../schema/user.shcema");
const jwt_1 = require("../utils/jwt");
class UserService {
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // call our user model to create a model
            return user_shcema_1.UserModel.create(input);
        });
    }
    login(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            // get our user by email
            const user = yield user_shcema_1.UserModel.find().findByEmail(input.email).lean();
            if (!user) {
                throw new apollo_server_1.ApolloError('Invalid user or password');
            }
            // validate the password
            const passwordIsValid = yield bcrypt_1.default.compare(input.password, user.password);
            if (!passwordIsValid) {
                throw new apollo_server_1.ApolloError('Invalid user or password');
            }
            //sign a jwt
            const token = (0, jwt_1.signJwt)(user);
            //set a cookie for the jwt
            context.res.cookie("accessToken", token, {
                maxAge: 3.154e10,
                httpOnly: true,
                domain: "localhost",
                path: "/",
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
            // return the jwt
            return token;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map