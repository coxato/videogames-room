const router = require("express").Router() ;
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const secret = require("../../config/config").secret;
// auth middlewares
const verifyToken = require('../middlewares/verifyToken');

// get user by id
router.get('/:id', verifyToken, async (req, res) => {
	const service = new UserService();
	// search the user by id
	let user = await service.getUser(req.params);
	console.log("*****  pasó la verificación")
	res.status(200).send(user);
});

// create/signup user
router.post('/signup', async (req, res) => {
	const service = new UserService();
	// save the user
	let user = await service.createUser(req.body);
	// if the user already exist
	if(!user) return res.status(200).json({isRegister: false, message: 'el email ya está en uso'});
	// the email is not already taken, successfully registration
	res.status(200).json({isRegister: true, message: 'successfully registration'});
});

// login user
// check email and password, then create a jwt
router.post('/login', async (req, res) => {
	const service = new UserService();
	const isUser = await service.loginUser(req.body);
	// if the user exist and password is correct
	if(isUser){
		const token = await jwt.sign({id: isUser.id}, secret, {
			expiresIn: 60 * 60, // 1 hour
		});
		// send the token
		return res.status(200).send({ auth: true, token });
	}
	// password or email incorrect
	return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
});

module.exports = router;