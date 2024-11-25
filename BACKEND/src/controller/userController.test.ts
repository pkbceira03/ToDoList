import request from 'supertest'
import express, {Application, response} from 'express'
import * as userService from '../service/userService'
import * as userController from '../controller/userController'
import userRouter from '../routes/usersRoute'
import { jest } from '@jest/globals';

//Mocka os metodos do service
jest.mock('../service/userService')
//mock do middleware
jest.mock('../middlewares/authMiddleware')

const app: Application = express()
app.use(express.json())
app.use('/', userRouter)

describe('User Controller test', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    /*
        ---------------------
        Get
        ---------------------
    */

    it('should return a list of all users', async() => {
        const usersData = [
            {
                id:2,
                name: "Pedro",
                email: "pedro@gmail.com",
                password: "1234"
            },
            {
                id:1,
                name: "Lucas",
                email: "lucas@gmail.com",
                password: "4321"
            }
        ];

        (userService.getUsers as jest.Mock).mockResolvedValue(usersData)
        
        const response = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer mockToken')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(usersData)
    })

    /*
        ---------------------
        Add
        ---------------------
    */

    it('should add user', async() => {
        const newUser = {
            id:2,
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        };

        (userService.addUser as jest.Mock).mockResolvedValue(newUser)

        const respopnse = await request(app)
            .post('/users')
            .send({
                name: "Pedro",
                email: "pedro@gmail.com",
                password: "1234"
            })
        
        expect(respopnse.status).toBe(201)
        expect(respopnse.body).toEqual(newUser)
    })

    /*
        ---------------------
        get by id
        ---------------------
    */

    it('should return a user by id', async() => {
        const userData = {
            id:2,
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        };

        (userService.getUserById as jest.Mock).mockRejectedValue(userData)

        const response = await request(app)
        .get('/users/2')
        .set('Authorization', 'Bearer mockToken');

        expect(response.status).toBe(200)
        expect(response.body).toEqual(userData)
    })

    it('should return 404 if user not exist', async() => {
        (userService.getUserById as jest.Mock).mockReturnValue(null)

        const response = await request(app)
            .get('/users/1')
            .set('Authorization', 'Bearer mockToken');

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ mensagem: 'Usuário não encontrado' })
    })

    /*
        ---------------------
        Update
        ---------------------
    */

    it('should update a ser', async() => {
        const updateUser = {
            id:2,
            name: "Pedro",
            email: "pedro@gmail.com",
            password: "1234"
        };

        (userService.updateUser as jest.Mock).mockRejectedValue(updateUser)
        
        const response = await request(app)
            .put('/users/1')
            .send({ name: 'Pedro Updated', email: 'pedro@gmail.com' })
            .set('Autorization', 'Bearer mockToken');

        expect(response.status).toBe(200)
        expect(response.body).toEqual(updateUser)
    })

    /*
        ---------------------
        Delete
        ---------------------
    */

    it('should delete a user by id', async() => {
        (userService.deleteUser as jest.Mock).mockRejectedValue(true)

        const reponse = await request(app)
            .delete('users/2')
            .set('Autorization', 'Bearer mockToken');

        expect(response.status).toBe(200)
        expect(response.body).toEqual({mensagem: 'Usuário deletado'})
    })

    it('should return 404 if user to delete is not found', async() => {
        (userService.deleteUser as jest.Mock).mockReturnValue(false)

        const response = await request(app)
            .delete('users/1')
            .set('Authorization', 'Bearer mockToken');

        expect(response.status).toBe(404)
        expect(response.body).toEqual({ mensagem: 'Usuário não encontrado' })
    })

    /*
        ---------------------
        Login
        ---------------------
    */
    it('should login a user', async() => {
        const userData = {
            id: '1',
            name: 'Pedro',
            email: 'pedro@gmail.com',
            password: '123456',
            comparePassword: jest.fn().mockResolvedValue(true),
        };

        (userService.getUserById as jest.Mock).mockReturnValue(userData)

        const response = await request(app).post('/login')
            .send({
                email: 'pedro@gmail.com',
                password: '123456'
            })

        expect(response.status).toBe(200)
        expect(response.body).toEqual('token')
    })
})