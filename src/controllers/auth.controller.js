const dotenv = require("dotenv")
dotenv.config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSrv = require("../services/user.service");
const helpers = require("../../config/helpers");
const emailObj = require("../services/mailer.service");


class authController {
    login = async (req, res, next) => { //1mb, 10gb => 10*1024 = 10000, throttle=>60-70 
        try {
            let data = req.body;
            await userSrv.validateLogin(data)
            let userDetail = await userSrv.getUserByEmail(data);


            if (userDetail) {
                //password check
                if (bcrypt.compareSync(data.password, userDetail.password)) {
                    if (userDetail.status && userDetail.status === 'active') {
                        let token = jwt.sign(
                            { id: userDetail._id },
                            process.env.JWT_SECRET,
                            { expiresIn: "1 day" }
                        )
                        let refreshToken = jwt.sign({
                            id: userDetail._id
                        }, process.env.JWT_SECRET, {
                            expiresIn: "3 days"
                        })


                        res.json({
                            result: {
                                accessToken: token,
                                refreshToken: refreshToken,
                                tokenType: "bearer",
                                user: userDetail
                            },
                            status: true,
                            msg: "User logged in successfully",
                            meta: null
                        })
                    } else {
                        next({ code: 400, msg: "User not activated" })
                    }
                } else {
                    next({ code: 400, msg: "Credentials does not match" })
                }
            } else {
                next({ code: 400, msg: "User does not exists" })
            }
        } catch (exception) {
            next({ code: 400, msg: exception })
        }
    }
    register = async (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }

            userSrv.validateRegister(data);

            data.status = 'inactive';
            data.activationToken = helpers.randomString(100);
            //TODO: send an email to registered account for the activation with token
            emailObj.sendEmail(
                data.email,
                "Activate your account!",
                `<strong>Dear ${data.name}, </strong>
                <p>Your account has been successfully registered.</p>
                <p>Please click the link below or copy link to activate your account:</p>
                <a href="https://localhost:3000/activate/${data.activationToken}">https://localhost:3000/activate/${data.activationToken}</a> 
                <p>Thank you for your support</p>
                <p>Regards,</p>
                <p>No Reply, Ecom 19</p>
                <small>Please do not reply to this email.</small>
                `
            )

            let response = await userSrv.createUser(data)
            res.json({
                result: data,
                status: true,
                msg: "User registered successfully",
                meta: null
            })
        } catch (exception) {
            next({ code: 400, msg: "Registration error" + exception, data: req.body })
        }
    }
    activateUser = async (req, res, next) => {
        try {
            let token = req.params.token
            let payload = req.body;
            await userSrv.validatePassword(payload);

            //bcrypt 
            //str=> abc=>bcrypt()=>xyz, cde, mno
            //bcrypt, bcryptjs
            let password = bcrypt.hashSync(payload.password, 10);
            let updateUserResponse = await userSrv.updateUser({
                password: password,
                status: 'active',
                activationToken: null
            }, {
                activationToken: token
            })
            if (updateUserResponse.modifiedCount) {
                res.json({
                    result: updateUserResponse,
                    status: true,
                    msg: "User activated successfully",
                    meta: null
                })
            } else {
                throw "The token is broken or already activated";
            }
        } catch (error) {
            console.log("Activation Error", error);
            next({ code: 400, msg: error })
        }
    }
    forgetPassword = (req, res, next) => {

    }
    logout = (req, res, next) => {

    }
    updatePassword = (req, res, next) => {

    }
    getLoggedInUser = (req, res, next) => {
        res.json({
            data: req.authUser,
            msg: "Acess Granted",
            status: true,
            meta: null
        })
    }
    refreshToken = async (req, res, next) => {
        try {
            let authUser = req.authUser;
            let token = jwt.sign(
                { id: authUser._id },
                process.env.JWT_SECRET,
                { expiresIn: "1 day" }
            )
            let refreshToken = jwt.sign({
                id: authUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "3 days"
            })
            res.json({
                data: {
                    token: token,
                    refreshToken: refreshToken,
                    tokenType: "bearer",

                },
                status: true,
                msg: "Refresh Token",
                meta: null
            })
        } catch (error) {
            console.log("Refresh Token: ", error)
        }
    }
    getAdmin = async (req, res, next) => {
        res.json({
            data: req.authUser,
            status: true,
            msg: "Admin User"
        })
    }
}
const authCtrl = new authController;
module.exports = authCtrl;