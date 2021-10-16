"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        context.res.status(403).send(Error("Not Authenticated"));
    }
    else {
        context.res.status(200);
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map