import UserModel, {User} from '../model/userModel';

export const getUsers = async (): Promise<User[]> =>{
    return UserModel.find();
}

export const getUserById = async (id:string): Promise<User|null> =>{
    return UserModel.findById(id);
}

export const getUserByEmail = async (email:string) : Promise<User|null> =>{
    return UserModel.findOne({email})
}

export const addUser = async (UserData:Partial<User>): Promise<User> =>{
    const newUser = new UserModel(UserData)
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