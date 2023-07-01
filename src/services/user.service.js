const Joi = require("joi");
const UserModel = require("../model/users.model");
class UserService {

    validateRegister = async (data) => {
        try {
            // if (!data.name) {
            //     throw ({ code: 400, msg: "Name is required", data: null })
            // }
            // if (!data.email) {
            //     throw ({ code: 400, msg: "Email is required", data: null })
            // }
            // if (!data.phone) {
            //     throw ({ code: 400, msg: "Phone is required", data: null })
            // }
            // if (!data.role) {
            //     throw ({ code: 400, msg: "Role is required", data: null })
            // }
            // if (data.role !== 'seller' && data.role !== 'customer') {
            //     throw ({ code: 400, msg: "User can be a seller or customer", data: null })
            // }
            let rules = Joi.object({
                name: Joi.string().min(3).max(30).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().allow(null, ''),
                // password:Joi.string().min(8).max(25).required(),
                role: Joi.string().pattern(/customer|seller/).default('customer'),
                address:Joi.string(),
                image: Joi.string()
            });
            let response = await rules.validateAsync(data);
            if (response.error) {
                throw response.error//.details[0].message;
            } else {
                return data;
            }
        } catch (exception) {
            throw exception;
        }
    }
    validateLogin = async (credentials) => {
        try {
            let rules = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            })
            let response = await rules.validateAsync(credentials);
            return response;

        } catch (exception) {
            console.log("ExceptionLogin", exception)
            throw exception.details[0].message
        }
    }
    validatePassword = async (password) => {
        try {
            let rules = Joi.object({
                password: Joi.string().min(3).max(25).required(),
                confirmPassword: Joi.string().valid(Joi.ref("password")).required()
            })
            let response = await rules.validateAsync(password);
        } catch (exception) {
            throw exception.detail[0].message;
        }
    }
    createUser = async (data) => {
        try {
            // let response = await this._db.collection('users').insertOne(data);
            let user = new UserModel(data);
            return await user.save()// store the data in db
        } catch (err) {
            throw err
        }
    }
    getUserByEmail = async (userCred) => {
        try {
            // let userDetail = await this._db.collection("users").findOne(userCred);
            let userDetail = await UserModel.findOne({email:userCred.email})
            return userDetail;
        } catch (err) {
            throw err;
        }
    }
    updateUser = async (data, filter) => {
        try {
            // let response = await this._db.collection("users").updateOne(filter, {
            //     $set: data
            // })
            let response = await UserModel.updateOne(filter, {
                $set:data
            })
            return response;
        } catch (exception) {
            throw exception;

        }
    }
    deleteUser = async (filter) => {
        try {
            // let response = await this._db.collection("users").deleteOne(filter);
            let response = await UserModel.deleteOne(filter)
            return response;
        } catch (exception) {
            throw exception;
        }
    }
}

const userSrv = new UserService;
module.exports = userSrv;