import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
    // @ts-ignore ----> add due to Express @types of express have some error 
    req: Request & { session: Express.Session };
    redis: Redis;
    res: Response;
}