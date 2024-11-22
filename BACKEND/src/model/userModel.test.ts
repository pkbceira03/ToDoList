import mongoose from "mongoose";
import UserModel, {User} from "./userModel";
import {MongoMemoryServer} from "mongodb-memory-server"
import bcrypt from "bcrypt";

let mongoServer: MongoMemoryServer | null=null;

beforeAll(async()=>{
    //cria banco na memoria para não mexer no banco real
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    //Conecta no banco criado
    await mongoose.connect(uri)
})

afterAll(async()=>{
    //desfaz a conexão
    if(mongoServer){
        await mongoose.disconnect();
        await mongoServer.stop();
    }
})

afterEach(async()=>{
    //limpa os dados entre os testes
    await UserModel.deleteMany({})
})

beforeEach(async() => {
    if(mongoServer){
        await mongoose.disconnect();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri)
    }
})

describe("user Model test", () => {
    it("should create a user and hash the password", async() =>{
        const userData = {
            name: "Pedro",
            email: "pedro${Date.now()}@gmail.com",
            password: "1234"
        }

        //cria o user 
        const user = new UserModel(userData)
        await user.save();

        //verifica se o user criado e se a senha foi criptografada
        expect(user.name).toBe(userData.name);
        expect(user.email).toBe(userData.email);
        expect(user.password).not.toBe(userData.password);

        const isPasswordCorrect = await bcrypt.compare("1234", user.password)
        expect(isPasswordCorrect).toBe(true);
    })

    it("should compare passwords correctly", async() => {
        const userData = {
            name: "Pedro",
            email: "pedro${Date.now()}@gmail.com",
            password: "1234"
        }

        const user = new UserModel(userData)

        await user.save()

        const isPasswordCorrect = await user.comparePassword("1234")
        expect(isPasswordCorrect).toBe(true)

        const isPasswordIncorrect = await user.comparePassword("4321")
        expect(isPasswordIncorrect).toBe(false)
    })
})