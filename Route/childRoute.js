const express=require("express");
const router= express.Router();
const Controller=require("../controller/childController.js");
const childValidator=require("../MV/Validation/childValidators.js");
const validator=require("../MV/Validation/validator")

router.route("/child")
      .get(Controller.getAllChildren)
      .post(childValidator.addChild,
            validator,
            Controller.addChild)

      .patch(childValidator.updateChild,
            validator,
            Controller.updateChild)

      

router.route("/child/:id")
      .get(childValidator.checkID,
                        validator,
                        Controller.getChildByID)
      .delete(Controller.deleteChild)  

module.exports=router;