const MongoLib = require("../mongo/connection");
const UserModel = require("../models/usuario");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require('bcryptjs');
const md5 = require("md5");

class UserService{
	constructor(){
		this.collection = "user";
		this.mongo = new MongoLib();
	}

	async createUser(data){
		let { collection, mongo } = this;
		let user = new UserModel(data);
		try{

			// encrypt password
			const salt = await bcrypt.genSalt(10);
			const hash = await (user.password, salt);
			// set password and random gravatar
			user.password = hash;
			user.foto = `https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`;
			const userCreated = await mongo.createOne(collection, user);
			return userCreated
		
		}catch(err){
			console.log(err)
		}

	}

	// login user, only returns a boolean
	async loginUser({email, password}){
		let { collection, mongo } = this;
		try{

			// check if the user exist
			let user = await mongo.getOne(collection, { email });
			if(user){
				let realUser = await bcrypt.compare(password, user.password);
				return realUser;
			}
			// user not exist
			else{
				return false;
			}

		}catch(err){
			console.log(err);
		}
	}

	async getUser({ id, nombre}){
		let { collection, mongo } = this;
		let query = id ? { _id: new ObjectId(id) } : { nombre };
		
		try{

			let user = await mongo.getOne(collection, query);
			return user;

		}catch(err){
			console.log(err);
		}
	}



}

module.exports = UserService;

