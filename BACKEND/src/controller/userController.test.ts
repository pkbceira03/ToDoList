import {query, Request, Response} from 'express'
import * as userController from './userController'
import User from '../model/userModel'
import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";
//import { decrypt } from 'dotenv';

let mongoServer: MongoMemoryServer | null = null;

describe('User Controller', () => {
    beforeAll(async () => {
        // Cria o banco na memória
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
    
        // Conecta ao banco
        await mongoose.connect(uri);
    });
    
    
    afterAll(async() => {
        //disconecta do banco 
        if(mongoServer){
            await mongoose.disconnect()
            await mongoServer.stop()
        }
    })
    
    afterEach(async () => {
        if (mongoose.connection.readyState === 1) { 
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                await collections[key].deleteMany(); 
            }
        }
    });
    

    afterAll(async () => {
        if (mongoose.connection.readyState === 1) { 
            await mongoose.disconnect();
        }
        if (mongoServer) {
            await mongoServer.stop(); 
        }
    });
    

    const mockRequest = (body = {}, params = {}, query ={}) => ({
        body,
        params,
        query,
    }) as Request

    const mockResponse = () => {
        const res = {} as Response
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res 
    }

    const mockNext = jest.fn(); 

    describe('createUser', () => {
        it("should create a user", async () => {
            const req = mockRequest({
                name:'Pedro',
                email: 'cabeceira2003@gmail.com',
                password: '123456'
            })
            const res = mockResponse();

            //Cria o usuario
            await userController.addUser(req, res,mockNext)
            //respostas esperadas
            expect (res.status).toHaveBeenCalledWith(201)
            expect (res.json).toHaveBeenCalledWith(expect.objectContaining({name:'Pedro',email: 'cabeceira2003@gmail.com'}))

            //confima se foi criada
            const userInDb = await User.findOne({email:'cabeceira2003@gmail.com'})
            expect(userInDb).not.toBeNull()
        })

        it("should return a Error if dont have one information", async() => {
            const req = mockRequest({
                name:'Pedro',
                password: '123456'
            })
            const res = mockResponse();

            //tenta criar o usuario sem email
            await userController.addUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Coloque todos os dados'})
        })
    })

    describe('getAllUsers', () => {
        it('should return all users', async() => {
            await User.create({
                name:'Pedro',
                email: 'cabeceira2003@gmail.com',
                password: '123456'
            })

            const req = mockRequest()
            const res = mockResponse()

            await userController.getUsers(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({name:'Pedro'})
                ])
            )
        })
    })

    describe('getUserById', () => {
        it('should return user by id', async() => {
            const user = await User.create({
                name:'Pedro',
                email: 'cabeceira2003@gmail.com',
                password: '123456'
            })

            const req = mockRequest({}, {id:user._id.toString()})
            const res = mockResponse()

            //faz a busca pelo id
            await userController.getUserById(req, res, mockNext)
            
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({name:'Pedro'})
            )
        })
    })


})