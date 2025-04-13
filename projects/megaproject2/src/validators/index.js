import { body } from "express-validator";

const useregisterationvaildator = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage("username can not be empty")
            .isLength({min : 5 , max : 10})
            .withMessage("Username should be between 5 and 10 charaters"),
        
        body('email')
            .trim()
            .notEmpty()
            .withMessage("Email can not be Empty")
            .isEmail()
            .withMessage("Not Proper Email")
    ]       
}

const userloginvalidator = () =>{
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("email can not be Empty")
            .isEmail()
            .withMessage("Email is Invalid"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password can not be Empty")
            .length({min : 8 , max : 12})
            .matches(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
            .withMessage("Password must contain at least one special character, one lowercase letter, one uppercase letter, and one number")
    ]
}

export {useregisterationvaildator,userloginvalidator}