const MongoLib = require("../mongo/connection");
const ObjectId = require("mongodb").ObjectId;

class ForumService{
	constructor(){
		this.collection = "foro";
		this.mongo = new MongoLib();
	}

	async saveMessage(messageObj){
		let { mongo, collection } = this;
		const saved = await mongo.createOne(collection, messageObj);
		return saved;
	}

	async getMessages(){
		let { mongo, collection } = this;
		const messages = await mongo.getAll(collection, {} );
		return messages;
	}

	async deleteMessage(id){
		let { mongo, collection } = this;
		const deleted = await mongo.deleteOne(collection, {_id: new ObjectId(id)} );
		return deleted;
	}
}

module.exports = ForumService;