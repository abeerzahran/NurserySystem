const {body,query,param}= require("express-validator");

exports.addClass=[
    // body("id").isInt().withMessage("the id should be number"),
    body("name").isString().withMessage("the name should be string"),
    body("supervisor").isMongoId().withMessage("the supervisor id must be a objectID"),
    // body("children").isArray().custom((value)=>{
    //     if(!value.every(Number.isInteger))return false;
    //     return true;
    // }).withMessage("enter the children IDs"),
    body("children").isArray().withMessage('Children IDs must be integers'),
    body('children.*').isInt().withMessage('Children IDs must be integers')

    
]
exports.updateClass=[
    // body("id").isInt().withMessage("the id should be number"),
    body("name").optional().isString().withMessage("the name should be string"),
    body("supervisor=").optional().isMongoId().withMessage("the supervisor id must be a objectID"),
    body("children").optional().isArray().withMessage('Children IDs must be integers'),
    body('children.*').isInt().withMessage('Children IDs must be integers')

   

]
exports.checkTeacherID= param("id").isInt().withMessage("the id should be number");

exports.checkID= param("id").isInt().withMessage("the id should be number");