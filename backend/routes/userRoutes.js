const router = require('express').Router();
const User = require('../models/User');


//user
router.post('/', async(req, res)=>{
    try{
        const {name,email,password,picture} = req.body;
        const user = await User.create({name,email,password,picture});
        res.status(201).json(user);
    }catch(err){
        console.log(err.message)
        res.status(500).json(err);
    }
})

router.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        user.status = 'online';
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
})