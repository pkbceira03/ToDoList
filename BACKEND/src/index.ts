import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/usersRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

//aplicação
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//banco de dados
mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("Conectado ao MongoDB Atlas"))
.catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Finaliza o processo se a conexão falhar
});


//rotas
app.use(usersRouter)

// app.get('/status', (req:Request, res:Response, next:NextFunction) => {
//     res.status(200).send({mensagem: "funcionando"})
// })

app.listen(3000, ()=>{
    console.log('aplicação na porta 3000')

})