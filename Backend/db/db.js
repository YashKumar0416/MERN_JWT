const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'})
const DB = process.env.DATABASE;


mongoose.connect(DB , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(()=> {
    console.log("Connection Successfull")
}).catch((err)=> {
    console.log(err)
})