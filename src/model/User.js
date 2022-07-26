const mongoose = require("mongoose");
const schema = mongoose.Schema

const userSchema = new schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: false,
        default: false
    }
})

userSchema.methods.getFullName = function(){
	return (this.firstname + ' ' + this.lastname);
};

module.exports = mongoose.model('User', userSchema)