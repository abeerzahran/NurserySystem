const child=require("../Model/child");
// const sequence=require("../Model/child");

exports.getAllChildren=(req,res,next)=>{
    child.find()
    .then((data)=>{
    res.status(200).json(data);
    })
    .catch((error)=> next(error));
}

exports.getChildByID=(req,res,next)=>{
    child.findById(req.params.id)
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



exports.addChild=(req,res,next)=>{
    const obj= new child(req.body);
    obj.save()
        .then((data)=>{
            res.status(200).json(data);

        })
        .catch((error)=> next(error));
    
}

exports.updateChild=(req,res,next)=>{
    child.findOneAndUpdate(({_id: req.body.id},req.body))
    .then((data)=>{
        if(!data){
            throw new Error("invalid ID");
        }
        else
            res.status(200).json({data:data});
    })
    .catch(error=>next(error));
    
}

exports.deleteChild=(req,res,next)=>{
    child.findByIdAndDelete({_id:req.params.id})
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