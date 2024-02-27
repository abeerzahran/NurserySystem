const jwt= require("jsonwebtoken");
const teacher= require("../Model/teacher");

exports.login=(req,res,next)=>{
    if(req.body.name=="Abeer"&& req.body.password=="12345")
    {
        let token = jwt.sign(
            {
              id: 1,
              name: "Abeer",
              role: req.body.role,
            },
            "track pd", 
            {
              expiresIn: "1h",
            }
          );
    }
    else{
        teacher.findOne({fullname:req.body.name,password:req.body.password})
        .then((data)=>{
            if(!data)
            {
                const error= new Error("not Authnicated")
                error.status=401;
                throw error;
            }
            let token = jwt.sign(
                {
                  id: data._id,
                  name: data.fullname,
                  role: req.body.role,
                },
                "track pd", 
                {
                  expiresIn: "1h",
                }
              );
            res.status(200).json({ data: "Authenticated", token });

        })
        .catch(error=>next(error));
    }
}