const mongoose = require("mongoose")
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
   
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Delete'],
        default: 'Active'
    }
    

})
const userModel = mongoose.model("users", userSchema)
module.exports = userModel;

// const updatedUserSchema =new schema({
//     oldUsername:{
//         type:String,
//         require:true
//     },
//     oldEmail:{
//         type:String,
//         require:true
//     },   
//     oldPassword:{
//         type:String,
//         require:true
//     }
// })
// const updatedUserModel=mongoose.model("oldUsers",updatedUserSchema)
// module.exports=updatedUserModel