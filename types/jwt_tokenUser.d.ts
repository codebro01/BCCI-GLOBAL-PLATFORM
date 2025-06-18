export type tokenUserType = {
    email: string, 
    id: string, 
    firstName: string, 
    lastName: string, 
    roles: string[], 
    otherNames: string, 
}

export type JWTErrorType = {
  name: string
  message: string
  expiredAt:?number
}
