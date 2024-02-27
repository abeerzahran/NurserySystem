const express=require("express");
const router= express.Router();
const Controller=require("../controller/childController.js");
const childValidator=require("../MV/Validation/childValidators.js");
const validator=require("../MV/Validation/validator");
const { isSupervisorOrTeacher, isSupervisor } = require("../MV/Authonticate/AuthonticartionMV.js");
const { login } = require("../controller/authonticationController.js");

router.route("/child")
      .get(isSupervisorOrTeacher,login,Controller.getAllChildren)
      .post(isSupervisor,login,childValidator.addChild,
            validator,
            Controller.addChild)

      .patch(isSupervisor,login,childValidator.updateChild,
            validator,
            Controller.updateChild)

      

router.route("/child/:id")
      .get(isSupervisorOrTeacher,login,childValidator.checkID,
                        validator,
                        Controller.getChildByID)
      .delete(isSupervisorOrTeacher,login,Controller.deleteChild)  

module.exports=router;