
const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcrypt');
const Schema= mongoose.Schema

const userSchema= new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(firstName, lastName, phone, email, password) {
    if (!email || !password || !firstName || !phone) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, firstName, lastName, phone });
    return user;
};
// login mthod
userSchema.statics.login= async function(email, password){

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incrorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}
module.exports = mongoose.model('User', userSchema)