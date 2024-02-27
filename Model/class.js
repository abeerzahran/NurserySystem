const mongoose= require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const teacher=require("../Model/teacher");
const child=require("../Model/child");

const schema= new mongoose.Schema({
    _id:Number,
    name: String,
    supervisor:{type:mongoose.Types.ObjectId, ref:"teacher"},
    children:{type:[Number], ref:"child"}
})
schema.plugin(AutoIncrement, { id: 'child_id_counter', inc_field: '_id' });
module.exports=mongoose.model("classes",schema);