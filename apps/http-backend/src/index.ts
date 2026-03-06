import express from 'express'
import cors from 'cors'
import { userRouter } from './Router/userRouter';
import { roomRouter } from './Router/roomRouter';

const app : express.Application = express();
const PORT : number = 3005; 

app.use(cors())
app.use(express.json())

app.get('/', (req : express.Request, res : express.Response) => {
    res.send("Welcome to backend")
})

app.use('/api/user', userRouter)
app.use('/api/room', roomRouter)

app.listen(PORT, () => {
    console.log(`Your Server is Running on http://localhost:${PORT}`)
})

