const express = require('express');
const router = express.Router();
require('../db/db');
const User = require('../Model/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middleware/authenticate');

const cookieParser = require('cookie-parser');

router.get('/', (req, res)=> {
    res.send("Hello from Router")
})

router.post('/register', async (req, res)=> {
    const {name, email, phone, work, password, cpassword} = req.body;
    // console.log(req.body.name)

    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(400).json({error: "Fill fields properly"})
    }

    try {
        const userExist = await User.findOne({email: email});
        if(userExist) {
            return res.status(400).json({error: "Email already exist"});
        } else if (password != cpassword) {
            return res.status(400).json({error: "Password does not match"});
        } else {    
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(200).json({message: "User Registered Successfully"});
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body;
        // console.log(email)
        let token;

        if(!email ||!password) {
            return res.status(400).json({error: "Enter Details"});
        }

        const loginuser = await User.findOne({email: email});
        if(loginuser) {
            const ismatch = await bcrypt.compare(password, loginuser.password);

            
            if(!ismatch) {
                res.status(400).json({error: "Invalid Credentials"})
            } else {

                token = await loginuser.generateAuthToken();
                console.log(token)
    
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                res.status(200).json({message: "Login Successfull"})
            }
        } else {
            res.status(400).json({error: "No user found"})
        }
    } catch (error) {
        console.log(error)
    }
})

router.use(cookieParser());

router.get('/about', authenticate, (req, res)=> {
    console.log("Hello After About Middleware")
    res.send(req.rootuser)
})

router.get('/getdata', authenticate, (req, res)=> {
    console.log("Hello after Contact Middleware")
    res.send(req.rootuser)
})

router.post('/contact', authenticate, async (req, res)=> {
    try {
        const { name, email, phone, message } = req.body;
        
        if(!name || !email || !phone || !message) {
            console.log("error in contact")
            return res.json({error: "Please fill properly"})
        }

        const userContact = await User.findOne({_id: req.userId});
        if(userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(200).json({message: "Message saved successfully"})
        }else {
            console.log("Error")
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', (req, res)=> {
    console.log("Hello Logout Page")
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send('User Logout')
})


module.exports = router;