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
        type:String
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

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);
            user.password = hash;
            user.passwordCnf = null;
            next();
        })
    })
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.passwordCnf;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error('invalid credentials');
    else isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('invalid credentials');
    return user
}

const User = mongoose.model('User', userSchema);
module.exports =  User;