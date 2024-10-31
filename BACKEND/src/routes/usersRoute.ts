import express, { Request, Response, NextFunction, Router } from 'express'
import * as userController from '../controller/userController'

const usersRouter = Router();



let dados = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' }
];

usersRouter.get('/users', userController.getUsers);
usersRouter.get('/users/:id', userController.getUserById);
usersRouter.post('/users', userController.addUser)
usersRouter.put('/users/:id', userController.updateUser)
usersRouter.delete('/users/:id', userController.deleteUser)

export default usersRouter;