const express = require("express");
const path = require("path");
const { port } = require("./config/config");
const MongoLibServices = require("./mongo/connection");
const morgan = require("morgan");
const cors = require("cors");
// const multerConfig = require("./config/multer");
const negocioRoutes = require("./routes/negocioRoutes");

// // initializations
const app = express();
const mongo = new MongoLibServices();

// // middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
// Configurar cabeceras y cors

// // multer middleware configuration
// multerConfig(app); 
// static files
// para requerir imagenes sería http://localhost:port/static/images/myImage.jpg
app.use('/static',express.static( path.join(__dirname,"public")) );
app.use(morgan("dev"));
// routes
app.use("/admin", negocioRoutes);


// start the server
let server;
function startServer(){
    server = app.listen(port, async() => {
        console.log(`server created at port ${port}`);
        process.on("SIGINT", closeServer);
        process.on("SIGTERM", closeServer);
    });
}
// disconnet mongo and close the server
async function closeServer(){
    try {
        await mongo.disconnect();
        server.close();
    } catch (err) {
        console.log("db error connection ",err);
    }
}
// run first the database connection and then the server
async function run(){
    try {
        let client = await mongo.connect();
        if(!client){
            throw new Error(client);
        }
        // connection successfully 
        startServer();
    } catch (err) {
        console.log("db error connection ",err);
    }
}
// run the rest api
run();




 