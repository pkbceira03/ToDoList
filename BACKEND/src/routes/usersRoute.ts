import express, { Request, Response, NextFunction, Router } from 'express'
import {addUser, loginUser, getUserById,getUsers, updateUser,deleteUser} from '../controller/userController'
import { authMiddleware } from '../middlewares/authMiddleware';


const usersRouter = Router();

// rotas públicas
usersRouter.post('/users', addUser)
usersRouter.post('/login', loginUser)

// rotas privadas
usersRouter.get('/users', authMiddleware, getUsers);
usersRouter.get('/users/:id', authMiddleware, getUserById);
usersRouter.put('/users/:id', authMiddleware, updateUser)
usersRouter.delete('/users/:id', authMiddleware, deleteUser)

export default usersRouter;