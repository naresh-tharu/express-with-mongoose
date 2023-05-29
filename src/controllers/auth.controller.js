const dotenv = require("dotenv")
dotenv.config();
const Joi = require("joi");
const userSrv = require("../services/user.service");

const { MongoClient } = require("mongodb");

class authController {
    login = async (req, res, next) => { //1mb, 10gb => 10*1024 = 10000, throttle=>60-70 
        try {
            let data = req.body;
            await userSrv.validateLogin(data)
            let userDetail = await userSrv.getUserByEmail(data);
            console.log(userDetail)
            res.json({
                result: userDetail,
                status: true,
                msg: "User logged in successfully",
                meta: null
            })
        } catch (exception) {
            next({ code: 400, msg: exception })
        }
    }
    register = async (req, res, next) => {
        try {
            let data = req.body;
            // console.log(req.file, req.files);
            if (req.file) {
                data.image = req.file.filename;
            }
            //data validation
            //name, email, phone, role
            await userSrv.validateRegister(data);
            data.status = 'inactive';
            let response = await userSrv.createUser(data)
            res.json({
                result: response,
                status: true,
                msg: "User registered successfully",
                meta: null
            })
        } catch (exception) {
            next({ code: 400, msg: "Registration error" + exception, data: data.req })
        }
    }
    activateUser = (req, res, next) => {

    }
    forgetPassword = (req, res, next) => {

    }
    logout = (req, res, next) => {

    }
    updatePassword = (req, res, next) => {

    }
    getLoggedInUser = (req, res, next) => {
        res.json({
            data: "Hello World",
            msg: "Acess Granted",
            status: true,
            meta: null
        })
    }
}
const authCtrl = new authController;
module.exports = authCtrl;