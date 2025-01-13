import {query, Request, Response} from 'express'
import * as userController from './userController'
import * as userService from '../service/userService'
import User from '../model/userModel'
import mongoose from 'mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";
import UserModel from '../model/userModel'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
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
    
    /*
      ------------------------------------
      createUser
      ------------------------------------
    */

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

    /*
      ------------------------------------
      getAllUser
      ------------------------------------
    */

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

    /*
      ------------------------------------
      getUserById
      ------------------------------------
    */

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

        it('should return a error if user dont exist', async() => {
            const req = mockRequest({}, {id: new mongoose.Types.ObjectId().toString()})
            const res = mockResponse()

            await userController.getUserById(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Usuário não encontrado'})
        })
    })

    /*
      ------------------------------------
      updateUser
      ------------------------------------
    */

    describe('updateUser', () => {
        it('should update one user', async() => {
            const user = await User.create({
                name:'Pedro',
                email: 'cabeceira2003@gmail.com',
                password: '123456'
            })
            const update = {name:'Lucas'}
            
            const req = mockRequest(update, {id: user._id.toString()})
            const res = mockResponse();

            await userController.updateUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({name:'Lucas'})
            )
        })

        it('should return a error if user dont exist', async() => {
            const req = mockRequest({name:'Pedro'}, {id:new mongoose.Types.ObjectId().toString()})
            const res = mockResponse()

            await userController.updateUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Usuário não encontrado'})
        })
    })

    /*
      ------------------------------------
      deleteUser
      ------------------------------------
    */

    describe('deleteUser', () => {
        it('should delete one user', async() =>{
            const user = await User.create({
                name:'Pedro',
                email: 'cabeceira2003@gmail.com',
                password: '123456'
            })

            const req = mockRequest({}, {id: user._id.toString()})
            const res = mockResponse()

            await userController.deleteUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Usuário deletado'})
        })

        it('shouldreturn an error i user dont exist', async() => {
            const req = mockRequest({}, { id:new mongoose.Types.ObjectId().toString()})
            const res = mockResponse()

            await userController.deleteUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({mensagem: 'Usuário não encontrado'})
        })
    })

    /*
      ------------------------------------
      loginUser
      ------------------------------------
    */

    describe('userLogin', () => {
        it('should return an error if email or passaword is missing', async() =>{
            const req = mockRequest({email:'user@email.com'})
            const res = mockResponse()

            await userController.loginUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Coloque todos os dados'})
        })

        it('should return an errorif the user doesnt exist', async()=>{
            const req = mockRequest({email:'teste@email.com', password:'123456'})
            const res = mockResponse()

            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

            await userController.loginUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({mensagem:'Email ou senha incorretos'})
            expect(userService.getUserByEmail).toHaveBeenCalledWith('teste@email.com')
        })

        it('should return error if password doesnot match', async() => {
            const mockUser = new UserModel ({
                _id: new mongoose.Types.ObjectId(),
                name: 'Pedro',
                email:'teste@email.com',
                password: await bcrypt.hash('correct_password', 10),
            })

            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser)

            const req = mockRequest({email:'teste@email.com', password:'654321'})
            const res = mockResponse()
 
            await userController.loginUser(req,res,mockNext)

            expect(res.status).toHaveBeenLastCalledWith(400)
            expect(res.json).toHaveBeenLastCalledWith({mensagem: 'Email ou senha incorretos'})
        })

        it('should return 200 and a token if login is sucessful', async() => {
            const mockUser = new UserModel ({
                _id: new mongoose.Types.ObjectId(),
                name: 'Pedro',
                email:'teste@email.com',
                password: await bcrypt.hash('correct_password', 10),
            })

            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser)

            const req = mockRequest({ email: 'test@email.com', password: 'correct_password' })
            const res = mockResponse()

            process.env.JWT_SECRET = 'testsecret'
            const token = jwt.sign({id: mockUser._id.toString()}, process.env.JWT_SECRET,{expiresIn: '1h'})

            await userController.loginUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({token})
        })

        it('should return 500 if there is a server error', async() => {
            jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error('Server error'))
            
            const req = mockRequest({email:'teste@email.com', password:'123456'})
            const res = mockResponse()

            await userController.loginUser(req,res,mockNext)

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                mensagem: 'Erro no servidor',
                error: expect.any(Error),
            });
        })
    })
})