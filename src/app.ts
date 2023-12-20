import express from 'express'
const app = express()
import cors from 'cors';
import { UserRoute } from './modules/user/user.route';
const port = 3000

//middleware
app.use(express.json());
app.use(cors())


app.use('/',UserRoute)
// app.get('/', (req, res) => {
//   res.send('Thank you for requesting my api.')
// })


export default app;