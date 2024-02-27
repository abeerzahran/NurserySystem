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

exports.getTeacherByID=(req,res,next)=>{
    
    teacher.findById({_id:req.params.id})
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

exports.getChildByID=(req,res,next)=>{
    res.status(200).json({data:{}});
}

exports.addClass=(req,res,next)=>{
    const supervisor= teacher.findById({"_id":req.body.supervisor});
    const children= req.body.children;
    // res.status(200).json(body.children);
    try{
        if(!supervisor)
        {
            throw new Error("in valid ID for Supervisor");
        }
        children.forEach(async(element) => {
            let Child= await child.findById({"_id":element});
            if(!Child)
            {
                throw new Error("you entered invalid child ID");
            }
        });
        const obj= new Class(req.body);
        obj .save()
            .then((data)=>{
                res.status(200).json(data);

            })
            
    }
    catch(error){
        next(error);
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