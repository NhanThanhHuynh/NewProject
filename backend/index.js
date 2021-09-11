const express = require("express");
const app = express();
const mongoose = require('mongoose')
const authRouter = require('../backend/routes/auth')
const postRouter = require('../backend/routes/post')
const cors = require('cors');
require('dotenv').config()

const connectDB= async ()=>{
    try {
       await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.4dymd.mongodb.net/mern-learnit?retryWrites=true&w=majority`,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
        })

        console.log('Mongodb connecting')
    } catch (error) {
        console.log('Error : ',error.message)
    }
}


app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log('Server started on', PORT));
