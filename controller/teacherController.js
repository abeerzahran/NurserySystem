const mongoose = require("mongoose");
const teacher=require("../Model/teacher");
// const {ObjectId}=require("mongodb");
// import { ObjectId } from "mongoose";
const { ObjectId } = require('mongodb');

exports.getAllTeachers=(req,res,next)=>{
    teacher.find()
    .then((data)=>{
    res.status(200).json(data);
    })
    .catch((error)=> next(error));
}

exports.getTeacherByID=(req,res,next)=>{
    teacher.findById(req.params.id)
    .then((data)=>{
        if(!data){
            throw new Error("invalid ID");
        }
        else{
            res.status(200).json(data);
        }

    })
    .catch((error)=>{
        next(error);
    })

}
//////////معملتهاش
exports.getSupervisors=(req,res,next)=>{
    res.status(200).json({data:[{},{},{}]});
}

exports.addTeacher=(req,res,next)=>{
    const obj= new teacher(req.body);
    obj.save()
        .then((data)=>{
            res.status(200).json(data);

        })
        .catch((error)=> next(error));
}

exports.updateTeacher=(req,res,next)=>{
    
    teacher.findByIdAndUpdate(({_id: req.body.id},req.body))
    .then((data)=>{
        if(!data){
            throw new Error("invalid ID");
        }
        else
            res.status(200).json({data:"the teacher updated"});
    })
    .catch(error=>next(error));
}

exports.deleteTeacher=(req,res,next)=>{

    // const id=new ObjectId(req.body.id);
    teacher.findByIdAndDelete({_id:req.params.id})
    .then((data)=>{
        if(!data)
        {
            throw new Error("invalid ID");
        }
        else
            {res.status(200).json({data:data});}
    })
    .catch(error=>next(error))
}