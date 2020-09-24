const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    logo:{
     type:String,
     default:"https://res.cloudinary.com/dpt8wpg3a/image/upload/v1594463326/orange_sktabg.jpg"
    },
    interests: {
        type: String,
        default: "No interests mentioned yet!!"
    },
    // followers:[{type:ObjectId,ref:"User"}],
    // following:[{type:ObjectId,ref:"User"}]
    sentRequest:[{
		username: {type: String, default: ''}
	}],
	request: [{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		username: {type: String, default: ''}
	}],
	friendsList: [{
		friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		friendName: {type: String, default: ''}
	}],
	totalRequest: {type: Number, default:0}
})

mongoose.model("User",userSchema)