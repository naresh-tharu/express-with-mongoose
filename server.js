const express = require("express");
const routes = require("./routes");
const routesV2 = require("./routes/v2.routes");
const { MulterError } = require("multer");
const app = express();

//body
//body => content type => json, urlencoded
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//mounting of routes
app.use("/api/v1", routes);
app.use("/api/v2", routesV2);

app.use((req, res, next) => {
    next({ code: 404, msg: "Resource not found" })
});

//Error handling middleware or Garbage collector
app.use((error, req, res, next) => {
    const statusCode = error.code || 500;
    const msg = error.msg || "Server error...";
    const data = error.content || JSON.stringify(error);

    if(error instanceof MulterError){
        statusCode= 400;
        msg=error.message;
        data= null;
    }
    console.log("TODO: Error on multer:", error)
    res.status(statusCode).json({
        data: data,
        msg: msg,
        status: false,
        meta: null
    })
})

app.listen(3005, "localhost", (err) => {
    if (err) {
        console.log("Server error occur...", err);
    } else {
        console.log("Server is running to the port:3005");
        console.log("Please press CTRL+C to disconnect the server...");
    }
})