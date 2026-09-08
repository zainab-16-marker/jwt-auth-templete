const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const testJWTCntrl=require('./controllers/test-jwt')
const authCntrl = require('./controllers/auth');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

//routs
app.post('/auth/sign-up', authCntrl.signup)
app.post('/auth/sign-in', authCntrl.login)


app.get('/protected',(req,res)=>{
    try{
        const userPayload = req.user;
        res.status(200).json({user});

    }catch(error){
        res.status(500).json({err:"somthing went wrong"})

    }
})


//test routes 
app.get('/test-jwt/sign-token',testJWTCntrl.signToken)
app.get('/test-jwt/verify-token',testJWTCntrl.verifyToken)
// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});