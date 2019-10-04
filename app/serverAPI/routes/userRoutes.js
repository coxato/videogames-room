const router = require("express").Router() ;
const UserService = require("../services/userService");

// get user by id
router.get('/:id', async (req, res) => {
	const service = new UserService();
	// search the user by id
	let user = await service.getUser(req.params);
	res.status(200).send(user);
});

// create/signup user
router.post('/signup', async (req, res) => {
	const service = new UserService();
	// save the user
	let user = await service.createUser(req.body);
	res.status(200).send(user);
});

// login user
router.post('/login', async (req, res) => {
	const service = new UserService();
	const isUser = await service.loginUser(req.body);
	res.status(200).send({ result: isUser });
});

module.exports = router;