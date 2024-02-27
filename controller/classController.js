const Class =require("../Model/class")
const teacher=require("../Model/teacher");
const child=require("../Model/child");
const { body } = require("express-validator");
const { Error } = require("mongoose");

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

exports.getChildByID=async(req,res,next)=>{
   Class.findById({_id:req.params.id})
   .populate({path:"children",select:{"fullname":1}})
   .then((data)=>{
    res.status(200).json(data.children);

   })
   .catch(error=>next(error))
}

exports.addClass=async (req,res,next)=>{
    const supervisor= await teacher.findById({"_id":req.body.supervisor});
    const children=await req.body.children;
    
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
        const obj = new Class(req.body);
        obj.save()
            .then((data)=>{
                res.status(200).json(data);
            })
            
    }
    catch(error){
        // res.json({error:error.message});
        next(error);
    }

    
}

exports.updateClass=async(req,res,next)=>{
    try{
        console.log(req.body._id);
        
        if(req.body.supervisor)
        {
            let supervisor= await teacher.findOne({_id:req.body.supervisor});
            if(!supervisor)
            {
                throw new Error("invalid teacher ID");
            }
        }
        if(req.body.children)
        {
            console.log(req.body._id);
            await Class.findById({_id:req.body._id})
            .then((data)=>{
                const combinedSet = new Set(req.body.children.concat(data.children));
                req.body.children=  Array.from(combinedSet);
            })
            
        }
        
         await Class.findOneAndUpdate(({_id: req.body.id},req.body));
         await res.status(200).json("class updated");
    
    }catch(error)
    {
        next(error);
    }
    
    
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