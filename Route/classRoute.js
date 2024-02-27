const express=require("express");
const router= express.Router();
const Controller=require("../controller/classController");
const classValidator=require("../MV/Validation/classValidators");
const validator=require("../MV/Validation/validator")
const {isTeacher,isAdmin,isAdminOrTeacher,isSupervisor}=require("../MV/Authonticate/AuthonticartionMV");
const { login } = require("../controller/authonticationController");



router.route("/class")
      .get(isAdmin,login,Controller.getAllClasses)
      .post(isAdmin,login,classValidator.addClass,
        validator,
        Controller.addClass)
      .patch(isSupervisor,login,classValidator.updateClass,
        validator,
        Controller.updateClass)
      .delete(isAdmin,login,Controller.deleteClass)  

router.get("/class/:id",isSupervisor,login,classValidator.checkID,validator,Controller.getClassByID);

router.get("/class/teachers/:id",isSupervisor,login,classValidator.checkTeacherID,validator,Controller.getTeacherByID);

router.get("/class/child/:id",isSupervisor,login,classValidator.checkID,validator,Controller.getChildByID);

module.exports=router;