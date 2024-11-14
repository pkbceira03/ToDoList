import express, { Request, Response, NextFunction, Router } from 'express'
import * as userController from '../controller/userController'
import { authMiddleware } from '../middlewares/authMiddleware';


const usersRouter = Router();

// rotas públicas
usersRouter.post('/users', userController.addUser)
usersRouter.post('/login', userController.loginUser)

// rotas privadas
usersRouter.get('/users', authMiddleware, userController.getUsers);
usersRouter.get('/users/:id', authMiddleware, userController.getUserById);
usersRouter.put('/users/:id', authMiddleware, userController.updateUser)
usersRouter.delete('/users/:id', authMiddleware, userController.deleteUser)

export default usersRouter;