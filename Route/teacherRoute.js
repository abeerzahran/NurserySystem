const express=require("express");
const router= express.Router();
const Controller=require("../controller/teacherController");
const teacherValidator=require("../MV/Validation/teacherValidators");
const validator=require("../MV/Validation/validator")


router.route("/teachers")
      .get(Controller.getAllTeachers)
      
      .post( teacherValidator.addTeacher, 
            // validator,
            Controller.addTeacher)

      .patch(teacherValidator.updateTeacher, 
            validator,
            Controller.updateTeacher)

      

router.route("/teachers/:id")
      .get(teacherValidator.checkID,
            validator,
            Controller.getTeacherByID)
            
      .delete(Controller.deleteTeacher)  

router.get("/teachers/supervisors",validator,Controller.getSupervisors);

module.exports=router;