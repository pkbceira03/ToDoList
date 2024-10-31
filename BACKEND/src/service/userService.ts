import {User, users} from '../model/userModel';

export const getUsers = (): User[] =>{
    return users
}

export const getUserById = (id:number): User|undefined =>{
    return users.find(user => user.id === id);
}

export const addtUser = (name:string, email:string): User =>{
    const newUser: User = {id:users.length + 1, name, email}
    users.push(newUser)
    return newUser
}

export const updateUser = (id:number, name?:string, email?:string): User|undefined =>{
    const user = getUserById(id)
    if(user){
        if(name) user.name = name;
        if(email) user.email = email;
    }

    return user
}

export const deleteUser = (id:number): boolean =>{
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        users.splice(index, 1)
        return true
    }

    return false

}