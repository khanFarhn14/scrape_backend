const express = require('express')
const connectDB = require('./db/connection')
const product = require('./routes/product')
const notFound = require('./middleware/notFound')

require('dotenv').config();


const app  = express();
app.use('/api/v1', product)
app.use(notFound)


const port = process.env.PORT || 3000


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
        
    }
}

start()