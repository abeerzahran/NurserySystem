const express=require("express");
const router= express.Router();
const Controller=require("../controller/classController");
const classValidator=require("../MV/Validation/classValidators");
const validator=require("../MV/Validation/validator")


router.route("/class")
      .get(Controller.getAllClasses)
      .post(classValidator.addClass,
        validator,
        Controller.addClass)
      .patch(classValidator.updateClass,
        validator,
        Controller.updateClass)
      .delete(Controller.deleteClass)  

router.get("/class/:id",classValidator.checkID,validator,Controller.getClassByID);

router.get("/class/teachers/:id",classValidator.checkTeacherID,validator,Controller.getTeacherByID);

router.get("/class/child/:id",classValidator.checkID,validator,Controller.getChildByID);

module.exports=router;