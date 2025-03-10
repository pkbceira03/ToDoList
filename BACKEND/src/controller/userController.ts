import * as userService from '../service/userService'
import UserModel, { User } from '../model/userModel';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ mensagem: 'Coloque todos os dados' });
        } else {
            const newUser = await userService.addUser({ name, email, password });
            return res.status(201).json(newUser);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;

        if (!name && !email) {
            return res.status(400).json({ mensagem: 'Coloque todos os dados' });
        } else {
            const updateUser = await userService.updateUser(id, name, email);

            if (updateUser) {
                return res.status(200).json(updateUser);
            } else {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const isDeleted = await userService.deleteUser(id);

        if (isDeleted) {
            return res.status(200).json({ mensagem: 'Usuário deletado' });
        } else {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ mensagem: 'Coloque todos os dados' });

        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(400).json({ mensagem: 'Email ou senha incorretos' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ mensagem: 'Email ou senha incorretos' });

        
        const token = jwt.sign({ id: user._id?.toString() }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return res.status(200).json({ token });
        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor', error });
    }
};


