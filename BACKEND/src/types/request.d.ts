import 'express';

declare module 'express' {
  export interface Request {
    user?: string | jwt.JwtPayload; // Atualize conforme o tipo de `decoded`
  }
}
