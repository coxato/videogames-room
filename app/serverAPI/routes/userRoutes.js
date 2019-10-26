const router = require("express").Router() ;
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const secret = require("../../config/config").secret;
// auth middlewares
const verifyToken = require('../middlewares/verifyToken');
const verifyTokenAdmin = require('../middlewares/verifyIsAdmin');

// get user by id
router.get('/:id', verifyToken, async (req, res) => {
	const service = new UserService();
	const id = req.params.id == 'null' ? req.userId : req.params.id;
	// search the user by id
	let user = await service.getUser({id});
	console.log("*****  pasó la verificación")
	res.status(200).send(user);
});

// check if user is admin
router.get("/check/admin", verifyTokenAdmin, (req, res) => {
	res.status(200).json({auth: true});
})

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
			expiresIn: 60 * 60 * 4 , // 4 hours
		});
		// send the token
		return res.status(200).send({ auth: true, token });
	}
	// password or email incorrect
	return res.status(401).json({ auth: false, token: null, message: 'email or password incorrect' });
});

module.exports = router;