const {body,query,param}= require("express-validator");

exports.addTeacher=[
    
    body("fullname").isString().withMessage("the fullname should be string"),
    body("password").isString().isLength({min:8}).withMessage("the password's length should longer than 8 and string"),
    body("email").isEmail().withMessage("invalid email"),
    body("image").optional().isString().withMessage("the image path should be string")

]
exports.updateTeacher=[
    // body("id").isMongoId().withMessage("the id should be objectID"),
    body("fullname").optional().isString().withMessage("the fullname should be string"),
    body("password").optional().isLength({min:8}).withMessage("the password's length should longer than 8"),
    body("email").optional().isEmail().withMessage("invalid email"),
    body("image").optional().isString().withMessage("the image path should be string")

]

exports.checkID= param("id").isMongoId().withMessage("the id should be objectID");