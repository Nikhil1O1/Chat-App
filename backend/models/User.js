const mongoose = require('mongoose');
const {isEmail, isLowercase} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'required'],
    },
    email:{
        type: String,
        isLowercase: true,
        unique: true,
        required: [true, 'required'],
        index: true,
        validate: [isEmail, 'invalid email']
    },
    password:{
        type:String,
        required: [true, 'required'],
    },
    passwordCnf:{
        type:String,
        required: [true, 'required'],
    },
    picture:{
        type:String,
    },
    newMessage:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        default: 'online'
    }
    },
{minimized: false});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('invalid credentials');
    else isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('invalid credentials');
    return user
}

const User = mongoose.model('User', userSchema);
module.exports =  User;