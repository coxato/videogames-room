const jwt = require('jsonwebtoken');
const UserService = require("../services/userService");
const secret = require('../../config/config').secret;

// verify if the user is admin and also, if has a session with a jwt
async function verifyIsAdmin(req, res, next) {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(401).json({auth: false, message: "no token provided"})
	}

	// verify if the token is correct and find the user
	// to check if is admin
	try{
		const decoded = await jwt.verify(token, secret);
		// set user _id to req object, {id: 'idValue'} -> jwt payload -> decoded.id
		req.userId = decoded.id;
		// find user
		const service = new UserService();
		const user = await service.getUser({id: req.userId});
		// if is admin
		if(user.isAdmin) next();
		else return res.status(401).json({auth: false, message: "user is not admin"});
	}
	// invalid token
	catch(err){
		return res.status(401).json({auth: false, message: err.message});
	}

}

module.exports = verifyIsAdmin;