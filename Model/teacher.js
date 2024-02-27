const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const ObjectId=require("mongoose");

const schema= new mongoose.Schema({
    fullname: String, 
    password: {type:String , min:8},
    email:{type: String, match:[/^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z]+\.com$/, 'Please fill a valid email address']},
    image:{type: String , required: false} 

});

schema.pre("save",async function(next) {
    try {
       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        
        next();
    } catch (error) {
        next(error);
    }
})
module.exports=mongoose.model("teachers",schema);