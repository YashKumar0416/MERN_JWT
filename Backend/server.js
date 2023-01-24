const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./db/db');
const User = require('./Model/UserSchema');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(require('./Router/auth'))

dotenv.config({path: './config.env'})

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`)
})