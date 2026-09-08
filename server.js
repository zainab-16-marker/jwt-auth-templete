const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');

const authCntrl = require('./controllers/auth');
const isSignIn = require('./middleware/isSignIn');
const testJWTRouter = require('./routes/route-jwt');

require('./config/database');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// routes


app.use('/auth')


app.use(isSignIn);

app.get('/protected', (req, res) => {
  try {
    const userPayload = req.user;
    res.status(200).json({ userPayload });

  } catch (error) {
    res.status(500).json({ err: 'something went wrong' });
  }
});

// test routes
app.use('/test-jwt', testJWTRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});