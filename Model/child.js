const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const address= new mongoose.Schema({
    city:String,
    street: String,
    building:String
},{_id:false});


const schema= new mongoose.Schema({
    _id:Number,
    fullname: {type:String },
    age:{type:Number},
    level:{type:["PreKG","KG1","KG2"]},
    address:address
})

schema.plugin(AutoIncrement);

module.exports=mongoose.model("children",schema);

