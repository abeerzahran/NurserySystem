const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const mongoose=require("mongoose");
const teacherRoute=require("./Route/teacherRoute");
const childRoute=require("./Route/childRoute");
const classRoute=require("./Route/classRoute");
const loginRoute =require("./Route/authonticationRoute");
const authenticationMV=require("./MV/Authonticate/AuthonticartionMV");

const server=express();

mongoose.connect("mongodb://127.0.0.1:27017/Nurserydb")
.then(()=>{
    console.log("db conected");
    server.listen(8080,()=>{

        console.log("the server is listening");
    
    });
})
.catch((error)=>console.log(error+ "DB problem"))



server.use(cors());

//logging middleWare
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//authentication
server.use((req,res,next)=>{
    if(true)
    {
        next();
    }
    else
    {
        next(new Error("an error happened"));
    }
});

//settings
server.use(express.json());
//routing
server.use(loginRoute);
server.use(authenticationMV);

server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);


//not found
server.use((req,res,next)=>{
    res.status(404).json({data:"notfound"});
});
//error
server.use((error,req,res,next)=>{
    res.status(500).json({data:"error:"+error});
})

