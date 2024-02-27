const express=require("express");
const router= express.Router();
const Controller=require("../controller/teacherController");
const teacherValidator=require("../MV/Validation/teacherValidators");
const validator=require("../MV/Validation/validator")
const {login}=require("../controller/authonticationController")
const {isTeacher,isAdmin,isAdminOrTeacher, isSupervisor}=require("../MV/Authonticate/AuthonticartionMV")



router.route("/teachers")
      .get(isAdmin,Controller.getAllTeachers)
      
      .post(isAdmin, teacherValidator.addTeacher, 
            validator,
            Controller.addTeacher)

      .patch(isTeacher,login,teacherValidator.updateTeacher, 
            validator,
            Controller.updateTeacher)

      

router.route("/teachers/:id")
      .get(isTeacher,teacherValidator.checkID,
            validator,
            Controller.getTeacherByID)
            
      .delete(isAdminOrTeacher,login,Controller.deleteTeacher)  

router.get("/teachers/supervisors",isSupervisor,validator,Controller.getSupervisors);

module.exports=router;