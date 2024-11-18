import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader){
        res.status(401).json({ mensagem: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1]; // Captura o token após "Bearer"

    if (!token) {
        res.status(401).json({ mensagem: 'Token não encontrado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido' });
    }
}
