const express = require('express');
const morgan = require('morgan');
const path = require("path");
const cors = require('cors');
const MongoLibServices = require("./mongo/connection");
const { port } = require("./config/config");
const checkCodeRoutes = require('./routes/checkCodeRoutes');
const negocioRoutes = require("./routes/negocioRoutes");
const noticiaRoutes = require("./routes/noticiaRoutes");
const eventsRoutes = require("./routes/eventsRoutes");
const commonRoutes = require("./routes/commonRoutes");
const codesRoutes = require("./routes/codesRoutes");
const forumRoutes = require("./routes/forumRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require('./routes/uploadRoutes');



// =======  initializations  =======
const app = express();
const mongo = new MongoLibServices();
// middlewares and static routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'))
app.use('/static',express.static(path.join(__dirname,'public')) );

// ==========  routes  ==========
// admin
app.use("/api/admin", negocioRoutes);
app.use("/api/admin", eventsRoutes);
app.use("/api/admin", codesRoutes);
app.use("/api/admin", uploadRoutes)
// check codes
app.use("/api/codes", checkCodeRoutes);
// users
app.use("/api/users", userRoutes);
// news
app.use("/api/noticias", noticiaRoutes);
// public simple data for all users
app.use("/api/data", commonRoutes);
app.use("/api/foro", forumRoutes);

// ===============================

// =======  start the server  =======
let server;
function startServer(){
    server = app.listen(port, () => {
        console.log(`\n\t  =======\nserver created at port ${port}\n\t  =======\n`);
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
        console.log("db error disconnection ",err);
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
// run the app
run();
