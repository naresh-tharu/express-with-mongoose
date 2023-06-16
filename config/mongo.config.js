const mongoose = require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
mongoose.connect(process.env.DB_URL, {
    autoCreate: true,
    autoIndex: true
}).then((res)=>{
    console.log("DB connected Successfully...")

}).catch((err)=>{
    console.log({err})
    console.log("Error establishing db connection...");
})