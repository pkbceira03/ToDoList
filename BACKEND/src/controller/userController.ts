import * as userService from '../service/userService'
import { Response, Request } from 'express'

export const getUsers = async (req:Request, res:Response,) =>{
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({menssagen:'Erro interno no servidor'})
    }
}

export const getUserById = async (req:Request, res:Response) =>{
    try {
        const id = req.params.id
        const user = await userService.getUserById(id)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({menssagem:'usuário não encontrado'})
        }
    } catch (error) {
        res.status(500).json({menssagen:'Erro interno no servidor'})
    }
}

export const addUser = async (req:Request, res:Response) =>{
    try {
        const {name, email} = req.body

        if(!name || !email){
            res.status(400).json({menssagem:'Coloque todos os dados'})
        }else{
            const newUser = await userService.addtUser(name,email)
            res.status(201).json(newUser)
        }  
    } catch (error) {
        res.status(500).json({menssagen:'Erro interno no servidor'})
    } 
}

export const updateUser = async (req:Request, res:Response) =>{
    try {
        const id = req.params.id
        const {name, email} = req.body

        if(!name && !email){
            res.status(400).json({menssagem:'Coloque todos os dados'})
        }else{
            const updateUser = await userService.updateUser(id, name, email)

            if(updateUser){
                res.status(200).json(updateUser)
            }else{
                res.status(404).json({menssagem:'usuário não encontrado'})
            }
        }
    } catch (error) {
        res.status(500).json({menssagen:'Erro interno no servidor'})
    }
}

export const deleteUser = async (req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const isDeleted = await userService.deleteUser(id)

        if(isDeleted){
            res.status(200).json({menssagem:'Usuário deletado'})
        }else{
            res.status(200).json({menssagem:'Usuário não encontrado'})
        }
    } catch (error) {
        res.status(500).json({menssagen:'Erro interno no servidor'})
    }
}