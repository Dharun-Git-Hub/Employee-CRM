const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer')
require('dotenv').config()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/crm',require('./Routes/routes.cjs'))

app.listen(PORT,()=>{
    console.log(`Server Initiated @Port: ${PORT}`)
})