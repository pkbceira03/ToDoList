import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as userService from "../service/userService"
import UserModel from "../model/userModel";

let mongoServer: MongoMemoryServer | null = null;

beforeAll(async() => {
    //Cria o banco na memoria
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    //conecta com o banco
    await mongoose.connect(uri)
})

afterAll(async() => {
    //disconecta do banco 
    if(mongoServer){
        await mongoose.disconnect()
        await mongoServer.stop()
    }
})

afterEach(async() => {
    //limpa os dados após cada uso de teste no banco
    await UserModel.deleteMany()
})

describe("user service tests", () => {
    /*
      ------------------------------------
      AddUser
      ------------------------------------
    */

    it("should add a user", async() =>{
        const userData = {
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        }
        //adiciona o user no banco
        const user = await userService.addUser(userData)
        //ve se o user foi definido 
        expect(user).toBeDefined()
        //compara os campos
        expect(user.name).toBe(userData.name)
        expect(user.email).toBe(userData.email)
        expect(user.password).not.toBe(userData.password)
    })

    /*
      ------------------------------------
      getUsers
      ------------------------------------
    */
    it("should get all users", async() => {
        const usersData = [
            {
                name: "Pedro",
                email: "pedro@gmail.com",
                password: "1234"
            },
            {
                name: "Lucas",
                email: "lucas@gmail.com",
                password: "4321"
            }
        ]
        //adiciona os dois users no banco
        await Promise.all(usersData.map((data) => userService.addUser(data)))
        //chama o get user
        const users = await userService.getUsers();
        //verifica se o resultado é igual a dois, que foi o que colocamos no banco
        expect(users).toHaveLength(2)
        //compara os campos
        expect(users[0].email).toBe(usersData[0].email)
        expect(users[1].email).toBe(usersData[1].email)
    })

    /*
      ------------------------------------
      getUserById
      ------------------------------------
    */

    it("should get a user by id", async() => {
        const userData = {
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        }
        //adiciona o user no banco
        const user = await userService.addUser(userData)
        //chama o get user 
        const fetchedUser = await userService.getUserById(user.id);
        //verifica se o user foi definido
        expect(fetchedUser).toBeDefined();
        //compara o compo email
        expect(fetchedUser?.email).toBe(userData.email)
    })

    /*
      ------------------------------------
      updateUser
      ------------------------------------
    */

    it("should update a user", async() => {
        const userData = {
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        }
        // adiciona o user no banco
        const user = await userService.addUser(userData)
        //chama o update
        const updatedUser = await userService.updateUser(user.id, "Pedro Update", "update@gmail.com")
        //compara os campos para ver se atualizou
        expect(updatedUser).toBeDefined()
        expect(updatedUser?.name).toBe("Pedro Update")
        expect(updatedUser?.email).toBe("update@gmail.com")
    })

    /*
      ------------------------------------
      deleteUser
      ------------------------------------
    */

      it("should delete a user", async() => {
        const userData = {
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        }
        //adiciona user no banco
        const user = await userService.addUser(userData)
        //chama o deleteUser
        const deleteResult = await userService.deleteUser(user.id)
        //verifica de removeu
        expect(deleteResult).toBe(true)
        //verifica se encontra o user deletado
        const fetchedUser = await userService.getUserById(user.id)
        expect(fetchedUser).toBeNull()
      })
})

