import type {Response, Request} from 'express';

export type contextType = {
    res: Response, 
    req: Request
}

