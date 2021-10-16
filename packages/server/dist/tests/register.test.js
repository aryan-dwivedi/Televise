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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const User_1 = require("../entities/User");
const email = "admin@email.com";
const password = "admin";
const mutation = `
mutation Register {
    register(options: {password: "${password}", email: "${email}"}) {
    }
  }`;
test("Register user", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, graphql_request_1.request)(constants_1.host, mutation);
    expect(response).toEqual({ register: true });
    yield (0, typeorm_1.createConnection)();
    const users = yield User_1.User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
}));
//# sourceMappingURL=register.test.js.map