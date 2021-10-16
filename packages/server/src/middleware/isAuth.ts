import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    context.res.status(403).send(Error("Not Authenticated"));
  }
  else{
    context.res.status(200);
  }

  return next();
};