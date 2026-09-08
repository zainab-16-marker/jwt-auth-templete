const User = require('../models/user')
const bcrypt=require('bcrypt')
const SALT_ROUDS=12;
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
   try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    
    if (userInDatabase) {
      return res.status(409).json({err: 'Username already taken.'});
    }
    
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_ROUDS)
    });

    // Construct the payload
    const payload = { username: user.username, _id: user._id };

    // Create the token, attaching the payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    // Send the token instead of the user
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};



const login = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  // only allow users that exist to login
  if (!userInDatabase) {
    return res.status(401).json({err:'Invalid credentials'});
  }

  // make sure the user's password matches the req.body.password
  if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
    return res.status(401).json({err:'Invalid credentials'});
  }

  // There is a user AND they had the correct password. Time to make a session!
  // Avoid storing the password, even in hashed format, in the session
  // If there is other data you want to save to `req.session.user`, do so here!
  const payload= {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

   const token = jwt.sign({ payload }, process.env.JWT_SECRET);
   res.json({ token });
};

module.exports={
    signup,
    login,
}