"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.BroadcastResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const uuid_1 = require("uuid");
let BroadcastResolver = class BroadcastResolver {
    broadcast(message, userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.findByIds(userIds);
            users.forEach(user => {
                user.notifications.push({
                    id: (0, uuid_1.v4)(),
                    message,
                    createdAt: new Date(),
                });
            });
            yield User_1.User.save(users);
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("message")),
    __param(1, (0, type_graphql_1.Arg)("userIds", () => [String])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BroadcastResolver.prototype, "broadcast", null);
BroadcastResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BroadcastResolver);
exports.BroadcastResolver = BroadcastResolver;
//# sourceMappingURL=broadcast.js.map