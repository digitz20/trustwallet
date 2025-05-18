require('./config/database')
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 4985

const userRouter = require('./routes/userRouter')
const seedphraseRouter = require('./routes/seedphraseRouter')


const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)
app.use(seedphraseRouter)


app.listen(PORT,()=>{
    console.log(`server is listening to port ${PORT}`);
    
})