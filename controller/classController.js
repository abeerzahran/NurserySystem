const Class =require("../Model/class")
const teacher=require("../Model/teacher");
const child=require("../Model/child");
const { body } = require("express-validator");

exports.getAllClasses=(req,res,next)=>{
    Class.find()
    .then((data)=>{
    res.status(200).json(data);
    })
    .catch((error)=> next(error));
}

exports.getClassByID=(req,res,next)=>{
    Class.findById(req.params.id)
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
    res.status(200).json({data:{}});
}

exports.getTeacherByID=async(req,res,next)=>{
    const teacherID= await Class.findById({"_id":req.params.id});
    teacher.findById({"_id":teacherID.supervisor})
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

exports.getChildByID=(req,res,next)=>{
    res.status(200).json({data:{}});
}

exports.addClass=async (req,res,next)=>{
    const supervisor= await teacher.findById({"_id":req.body.supervisor});
    const children= req.body.children;
    // res.status(200).json(body.children);
    try{
        if(!supervisor)
        {
            throw new Error("in valid ID for Supervisor");
        }
        await Promise.all(
        children.map(async(element) => {
            let Child= await child.findById({"_id":element});
            if(!Child)
            {
                throw new Error("you entered invalid child ID");
            }
        })
        );
        
        obj .save()
            .then((data)=>{
                res.status(200).json(data);
            })
            
    }
    catch(error){
        res.json({error:error.message});
    }

    
}

exports.updateClass=(req,res,next)=>{
    res.status(200).json({data:"the class updated"});
}

exports.deleteClass=(req,res,next)=>{
    Class.findByIdAndDelete({_id:req.params.id})
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