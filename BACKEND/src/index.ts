import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/usersRoute';

const app = express();

//aplicação
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//rotas
app.use('/api', usersRouter)

app.get('/status', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).send({mensagem: "funcionando"})
})

app.listen(3000, ()=>{
    console.log('aplicação na porta 3000')
})