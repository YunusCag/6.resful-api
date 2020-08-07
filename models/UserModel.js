const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    userName: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        minLength:6,
        trim: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
}, { collection: 'app_users', timestamps: true });

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6).trim()
});

// this method is for  inserting new users
UserSchema.methods.joiValidation = (userObject) => {

    schema.required();
    return schema.validate(userObject);

}
UserSchema.methods.toJSON = function(){
    const user=this.toObject();
    //delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.password;
    delete user.__v;
    return user;
}
UserSchema.methods.generateToken= async  function(){
    const loginUser=this;
    const token=await jwt.sign({
        _id:loginUser._id,
        // email:loginUser.email,
        // active:true,
    },'secretkey',{
        expiresIn:'1h'
    });

    return token;

}

UserSchema.statics.login=async (email,password)=>{

    const {error,value}=schema.validate({email,password});
    if(error){
        throw createError(400,error);
    }

    const user=await User.findOne({ email});

    if(!user){
        throw createError(400,"Wrong email/password");
    }

    const checkPassword=await bcrypt.compare(password,user.password);
    if(!checkPassword){
        throw createError(400,"Wrong email/password");
    }

    return user;

}

// this method is for  update existing users
UserSchema.statics.joiValidationForUpdate = (userObject) => {
    return schema.validate(userObject);

}

const User = mongoose.model('User', UserSchema);



module.exports = User;

