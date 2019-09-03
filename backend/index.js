const express = require("express");
const path = require("path");
const { port } = require("./config/config");
const MongoLibServices = require("./mongo/connection");
const morgan = require("morgan");
// const multerConfig = require("./config/multer");
const negocioRoutes = require("./routes/negocioRoutes");

// initializations
const app = express();
const mongo = new MongoLibServices();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// multer middleware configuration
// multerConfig(app);
// static files
// para requerir imagenes sería http://localhost:port/static/images/myImage.jpg
app.use('/static',express.static( path.join(__dirname,"public")) );
app.use(morgan("dev"));
// routes
app.use("/admin", negocioRoutes);


// start the server
function startServer(){
    app.listen(port, () => console.log(`server created at port ${port}`));
}
// run first the database connection and then the server
function run(){
    mongo.connect().then(
        () => startServer()
    ).catch( err => {
        console.log(err);
    })
}
// run the api rest
run();




 