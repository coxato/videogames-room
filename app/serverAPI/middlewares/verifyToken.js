const jwt = require('jsonwebtoken');
const secret = require('../../config/config').secret;

async function verifyToken(req, res, next) {
	const token = req.headers['x-access-token'];
	if(!token){
		return res.status(401).json({auth: false, message: "no token provided"})
	}

	// verify if the token is correct
	try{
		const decoded = await jwt.verify(token, secret);
		// set user _id to req object, {id: 'idValue'} -> jwt payload -> decoded.id
		req.userId = decoded.id
		next();
	}catch(err){
		return res.status(401).json({auth: false, message: err.message});
	}

}

module.exports = verifyToken;