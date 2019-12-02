import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import morgan from 'morgan';
import path from "path";
import cors from 'cors';
import MongoLibServices from "./serverAPI/mongo/connection";
import { port } from "./config/config";
// const multerConfig = from "./config/multer";
import checkCodeRoutes from './serverAPI/routes/checkCodeRoutes';
import negocioRoutes from "./serverAPI/routes/negocioRoutes";
import noticiaRoutes from "./serverAPI/routes/noticiaRoutes";
import eventsRoutes from "./serverAPI/routes/eventsRoutes";
import commonRoutes from "./serverAPI/routes/commonRoutes";
import codesRoutes from "./serverAPI/routes/codesRoutes";
import forumRoutes from "./serverAPI/routes/forumRoutes";
import userRoutes from "./serverAPI/routes/userRoutes";
import uploadRoutes from './serverAPI/routes/uploadRoutes';
// import { StaticRouter } from 'react-router';
import templateReact from './utilities/templateReact';
import AppSSR from './dist/ssr/appSSR';



// =======  initializations  =======
const app = express();
const mongo = new MongoLibServices();
// middlewares and static routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'))
app.use('/static',express.static(path.join(__dirname,'public')) );
app.use('/static-dist', express.static(path.join(__dirname,'dist')) );

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

// *****  routes for react  *****
// render react views
app.get('*', (req, res) => {
    const html = ReactDOMServer.renderToString(AppSSR);
	res.write( templateReact(html) );
	res.end();
});
// ******************************* 


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
