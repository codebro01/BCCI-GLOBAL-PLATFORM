import type {Response, Request} from 'express';

export type contextType = {
    res: Response, 
    req: Request
}

export type RoleType = string[]


