const app = require("express").Router();
// const authCheck = require("../src/middleware/auth-check.middleware");
const authRoutes = require("./auth.routes");
const bannerRoutes = require("./banner.routes")
app.use("/auth",authRoutes);
app.use("/banner", bannerRoutes)

// const app = express();
// const app = express.Router();

// app.route("/brand")
// .get((req, res, next)=>{})
// .post(authCheck,(req, res, next)=>{}) //loggin, admin role

// app.route("/brand/:id")
// .get((req, res, next)=>{})
// .put(authCheck,(req, res, next)=>{}) //loggin, admin role
// .delete(authCheck,(req, res, next)=>{}) //loggin, admin role


// // app.get("/brand", (req, res, next)=>{}) //get
// // app.post("/brand", (req, res, next)=>{}) // create
// // app.put("/brand/:id", (req, res, next)=>{}) //update
// // app.delete("/brand/:id", (req, res, next)=>{}) //delete
// // app.get("/brand/:id", (req, res, next)=>{}) //details of any one brand

// //middlware
// //login check
// app.use((req, res, next)=>{
//     console.log("I am a first middleware call");
//     // login check
//     req.user = "Test user";
//     //end
//     next()
// })
// app.use((req,res,next)=>{
//     console.log("I am a second middlware call");
//     console.log(req.user);
//     next()
// })

// // get=> /home page data fetched
// app.get("/", (req, res, next)=>{
//     res.json({
//         data:{},
//         status:true,
//         msg:"Home page Data fetched...",
//         meta:null
//     })
// })

// //we can send 'n' level of parameter
// app.get("/user/:name/:role", (req, res)=>{
//     let params =req.params;
//     res.json({
//         data:{
//             params:params
//         }
//     })
// })

module.exports = app;