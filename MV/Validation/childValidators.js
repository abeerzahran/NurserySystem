const {body,query,param}= require("express-validator");

exports.addChild=[
    // body("id").isInt().withMessage("the id should be number"),
    body("fullname").isString().withMessage("the fullname should be string"),
    body("age").isInt().withMessage("the age should be integer"),
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage("level must be in {'PreKG','KG1','KG2'}"),
    body("address").isObject().withMessage("address should be object"),
    body("address.city").isString().withMessage("you should enter the city"),
    body("address.street").isString().withMessage("you should enter the street"),
    body("address.building").isString().withMessage("you should enter the building")
]
exports.updateChild=[
    // body("id").isInt().withMessage("the id should be number"),
    body("fullname").optional().isString().withMessage("the fullname should be string"),
    body("age").optional().isInt().withMessage("the age should be integer"),
    body("level").optional().isIn(["PreKG","KG1","KG2"]).withMessage("level must be in {'PreKG','KG1','KG2'}"),
    body("address").optional().isObject().withMessage("address should be object"),
    body("address.city").optional().isString().withMessage("you should enter the city"),
    body("address.street").optional().isString().withMessage("you should enter the street"),
    body("address.building").optional().isString().withMessage("you should enter the building")

]

exports.checkID= param("id").isInt().withMessage("the id should be number");