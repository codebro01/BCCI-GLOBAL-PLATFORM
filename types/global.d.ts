import type {Response, Request} from 'express';

export type contextType = {
    res: Response, 
    req: Request, 
    user: jwtDecodedPayload
}

type jwtDecodedPayload = {
    email: string, 
    id: string, 
    firstName: string, 
    surname: string,
    otherNames:string,
    iat: number,
    exp: number
    roles: string[]
}



export type RoleType = string[]


