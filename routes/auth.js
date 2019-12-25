const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

//register
router.post('/register', async (req,res) => {
    
    //validate the data before make a user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist)  return res.status(400).send('Email already exist');

    //Hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

//login
router.post('/login', async (req,res) => {

    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if email is exists
    const user = await User.findOne({email: req.body.email});
    if(!user)  return res.status(400).send('Email or password is wrong!');

    //password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password!');
    
    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    


    res.send('Logged in!');
});

module.exports = router;

