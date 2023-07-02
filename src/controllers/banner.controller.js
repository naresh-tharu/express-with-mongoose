const bannerSvc = require("../services/banner.service");

class BannerController {
    createBanner = async (req, res, next) => {
        try {
            let data = req.body;
            if (!req.file) {
                throw { code: 400, msg: "Image required" }
            }
            data.image = req.file.filename;
            let validationResponse = await bannerSvc.validateCreateRequest(data);
            let response = await bannerSvc.addBannerData(validationResponse)
            res.json({
                result: response,
                status: true,
                msg: "Banner Created Successfully",
                meta: null
            })
        } catch (exception) {
            console.log({ exception })
            next({ exception })
        }
    }
    listAllBanners = async (req, res, next) => {
        try {
            let response = await bannerSvc.getAllBanners()
            //TODO: Pagination
            res.json({
                result:response,
                msg:"Banner Data fetched",
                status:true,
                meta:null
            })
        } catch (except) {
            next(except)
        }
    }
    listAllBannersForHomepage = async (req, res, next) => {

    }
    updateBannerById = async (req, res, next) => {

    }
    deleteBannerById = async (req, res, next) => {

    }
}
const bannerCtrl = new BannerController()
module.exports = bannerCtrl;