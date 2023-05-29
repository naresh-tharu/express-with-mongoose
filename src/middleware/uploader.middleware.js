const helpers = require("../../config/helpers")
const fs = require("fs");
const multer = require("multer");

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = req.uploadPath;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true
            })
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        //filename.ext
        //random string =>unique
        // let fname = Date.now() + "-" + file.originalname; //time in milisecond
        let fname = Date.now() + "-" + helpers.randomString(30) + "-" + file.originalname;
        cb(null, fname)
    }
})

const imageFilter = (req, file, cb) => {
    try {
        let filename = file.originalname; //n.a.m.e.ext => ["n", "a", "m", "e", "ext"]
        let ext = filename.split(".").pop();
        //ext = jpg, JPG, jPg,
        //TODO: Generate a config file /env

        let allowed = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
        if (allowed.includes(ext.toLowerCase())) {
            cb(null, true)
        } else {
            cb(true, false) // server.js => error handling middleware
        }
    } catch (err) {
        cb(err, null);
    }
}
const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5000000 //5*1000*1000
    }
})

module.exports = uploader;