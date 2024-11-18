import 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  export interface Request {
    user?: string | jwt.JwtPayload; // Defina o tipo de `decoded` aqui
  }
}
