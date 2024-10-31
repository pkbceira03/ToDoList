import UserModel, {User} from '../model/userModel';
import { v4 as uuidv4 } from 'uuid'

export const getUsers = async (): Promise<User[]> =>{
    return UserModel.find();
}

export const getUserById = async (id:string): Promise<User|null> =>{
    return UserModel.findById(id);
}

export const addtUser = async (name:string, email:string): Promise<User> =>{
    const newUser = new UserModel({name,email})
    await newUser.save()
    return newUser
}

export const updateUser = async (id:string, name?:string, email?:string): Promise<User|null> =>{
    const updateUser = await UserModel.findByIdAndUpdate(id,{name,email}, {new:true})
    return updateUser
}

export const deleteUser = async (id:string): Promise<boolean> =>{
    const deleteUser = await UserModel.findByIdAndDelete(id);
    return deleteUser !== null

}