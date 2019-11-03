const MongoLib = require("../mongo/connection");
const ObjectId = require("mongodb").ObjectId;
const NoticiaModel = require("../models/noticia");


class NoticiaService{
	constructor(){
		this.mongo = new MongoLib();
		this.collection = "noticia";
	}

	// agregar noticia
	async crear(notiObj){
		let { mongo, collection } = this;
		let noticia = new NoticiaModel(notiObj);
		let created = await mongo.createOne(collection, noticia);
		return created;
	}


	// traer noticia
	async getOne(id){
		let { mongo, collection } = this;
		let noticia = await mongo.getOne(collection, {_id: new ObjectId(id)});
		return noticia;
	}


	// traer todas las noticias
	async getMany(){
		let { mongo, collection } = this;
		let noticias = await mongo.getAll(collection, {});
		return noticias;
	}


	// modificar noticia
	async actualizar(id, newValue){
		let { mongo, collection } = this;
		let updated = await mongo.updateOne(collection, {_id: new ObjectId(id)},
			{
				$set: { ...newValue }
			});
		return updated;
	}


	// eliminar noticia
	async borrar(id){
		let { mongo, collection } = this;
		let deleted = await mongo.deleteOne(collection, {_id: new ObjectId(id)});
		return deleted;
	}
}

module.exports = NoticiaService;