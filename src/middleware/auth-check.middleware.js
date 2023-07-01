const authCheck = (req, res, next) => {
    //TODO: Check user login here
    let success = false;
    if (success) {
        next()
    } else {
        next({ code: 401, msg: "User not loggin..." })
    }
}
module.exports = authCheck;