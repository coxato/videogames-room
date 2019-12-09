const router = require("express").Router();
const ForumService = require("../services/forumService");
const UserService = require("../services/userService");
const ObjectId = require("mongodb").ObjectId;
const secret = require('../config/config').secret;
const jwt = require("jsonwebtoken");
const simpleTokenVerification = require("../middlewares/verifyIsAdminSimple");

// get all messages
router.get("/messages", simpleTokenVerification ,async (req, res) => {
	const service = new ForumService();
	const { isAdmin } = res.locals;
	let messages = await service.getMessages();
	res.status(200).send({messages, isAdmin});
});

// save message
router.post("/save", async (req, res) => {
	const service = new ForumService();
	const userService = new UserService();
	const messageObj = req.body;
	const token = req.headers['x-access-token'];
	// save message anonymous from user 
	// username 
	let username;
	let foto;
	let isAdmin;
	if(!token){
		username = 'Anónimo';
		foto = '';
	}
	// user is login
	else{
		// ########
		let decoded;
		// verify if the token is correct
		try{
			decoded = await jwt.verify(token, secret);
			// token is valid
			// get the user data
			const user = await userService.getUser({id: new ObjectId(decoded.id)});
			foto = user.foto;
			username = user.nombre + ' ' + user.apellido;
			isAdmin = user.isAdmin;
		}catch(err){
			console.log("error de ruta foro, /save",err)
			// error while verify token, i.e expired
			foto = '';
			username = 'Anónimo';
		}
	}
	// set the message to save object
	const messageToSave = {
		...messageObj,
		username,
		foto,
		isAdmin
	}
	console.log("####### messageToSave", messageToSave)
	// save message
	const messages = await service.saveMessage(messageToSave);
	res.send('message created');
})

// delete all messages
router.delete("/delete/:id", async (req, res) => {
	const service = new ForumService();
	const { id } = req.params;
	const deleted = await service.deleteMessage(id);
	res.send("message deleted");
});

module.exports = router;