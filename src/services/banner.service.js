const Joi = require("joi");
const BannerModel = require("../model/banner.model");
class BannerService {
    validateCreateRequest = async (data) => {
        try {
            let rules = Joi.object({
                title: Joi.string().required(),
                link: Joi.string().default(null),
                status: Joi.string().required(),
                image: Joi.string().required()
            })
            let validation = await rules.validateAsync(data)
            return validation
        } catch (except) {
            // console.log(except)
            throw ({ code: 400, msg: except?.details?.[0]?.message })
        }
    }
    addBannerData = async (data) => {
        try {
            let bannerObje = new BannerModel(data)
            return await bannerObje.save(); //insert operation

        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Data validation failure" }
        }
    }
    getAllBanners = async ()=>{
        try {
            let bannersData = await BannerModel.find();
            return bannersData
        } catch (except) {
            console.log({ except })
            throw { code: 400, msg: "Query exception" }
        }
    }

}
const bannerSvc = new BannerService();
module.exports = bannerSvc;