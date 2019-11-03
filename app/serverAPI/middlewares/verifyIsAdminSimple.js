const jwt = require('jsonwebtoken');
const UserService = require("../services/userService");
const secret = require('../../config/config').secret;

// verify if the user is admin and also, if has a session with a jwt
// with res.locals save if user isAdmin, so the next middleware can use data in res.locals 
async function verifyIsAdminSimple(req, res, next) {
	const token = req.headers['x-access-token'];
	if(!token){
		res.locals.isAdmin = false;
		return next();
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
		if(user.isAdmin) {
			res.locals.isAdmin = true;
			return next();
		}
		else{
			res.locals.isAdmin = false;
			return next();
		}
	}
	// invalid token
	catch(err){
		console.log('simple isAdmin middleware error:\n ',err.message);
		res.locals.isAdmin = false;
		return next();
	}

}

module.exports = verifyIsAdminSimple;