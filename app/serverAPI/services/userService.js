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

	// create a user if email is not taken
	async createUser(data){
		let { collection, mongo } = this;
		let user = new UserModel(data);
		try{
			// check if the email is not taken
			const userExist = await mongo.getOne(collection, {email: data.email});
			if(userExist){
				return null;
			}else{
				// encrypt password
				// const salt = await bcrypt.genSalt(10);
				// gen hash
				const hash = await bcrypt.hash(user.password, 10);
				// set password and random gravatar
				user.password = hash;
				user.foto = `https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`;
				// save the user in DB
				const userCreated = await mongo.createOne(collection, user);
				return userCreated
			}
		
		}catch(err){
			console.log(err)
		}

	}

	// login user, check if the user exist and if the password is correct, returns the user _id or null
	async loginUser({email, password}){
		let { collection, mongo } = this;
		try{

			// check if the user exist
			let user = await mongo.getOne(collection, { email });
			if(user){
				let realUser = await bcrypt.compare(password, user.password);
				// all ok return a user Object
				if(realUser) return { id: user._id };
				// incorrect password
				else return null;
			}
			// user not exist
			else{
				return null;
			}

		}catch(err){
			console.log(err);
		}
	}

	async getUser({ id, nombre}){
		let { collection, mongo } = this;
		let query = id ? { _id: new ObjectId(id) } : { nombre };
		
		try{

			let user = await mongo.getOne(collection, query, {password: 0});
			return user;

		}catch(err){
			console.log(err);
		}
	}



}

module.exports = UserService;

