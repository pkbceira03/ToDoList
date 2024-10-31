import * as userService from '../service/userService'
import { Response, Request } from 'express'

export const getUsers = (req:Request, res:Response,) =>{
    const users = userService.getUsers();
    res.status(200).json(users);
}

export const getUserById = (req:Request, res:Response) =>{
    const id = parseInt(req.params.id, 10)
    const user = userService.getUserById(id)
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({menssagem:'usuário não encontrado'})
    }
}

export const addUser = (req:Request, res:Response) =>{
    const {name, email} = req.body

    if(!name || !email){
        res.status(400).json({menssagem:'Coloque todos os dados'})
    }else{
        const newUser = userService.addtUser(name,email)
        res.status(201).json(newUser)
    }   
}

export const updateUser = (req:Request, res:Response) =>{
    const id = parseInt(req.params.id, 10)
    const {name, email} = req.body

    if(!name && !email){
        res.status(400).json({menssagem:'Coloque todos os dados'})
    }else{
        const updateUser = userService.updateUser(id, name, email)

        if(updateUser){
            res.status(200).json(updateUser)
        }else{
            res.status(404).json({menssagem:'usuário não encontrado'})
        }
    }
}

export const deleteUser = (req:Request, res:Response)=>{
    const id = parseInt(req.params.id, 10)

    const isDeleted = userService.deleteUser(id)

    if(isDeleted){
        res.status(200).json({menssagem:'Usuário deletado'})
    }else{
        res.status(200).json({menssagem:'Usuário não encontrado'})
    }
}