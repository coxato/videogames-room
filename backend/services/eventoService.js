const MongoLib = require("../mongo/connection");
const EventoModel = require("../models/eventos");
const ObjectId = require("mongodb").ObjectID();


class EventoService{
    constructor(){
        this.collection = "evento";
        this.mongo = new MongoLib();
    }
    // ================================  crear  ======================================

    async crearEvento(json){
        let { mongo, collection } = this;
        let evento = new EventoModel(json);
        let created = await mongo.createOne(collection, evento);
        return created.insertedId;

    }

    // ============================  encontrar  ======================================
    async getEventos(){
        let { mongo, collection } = this;
        let eventos = await mongo.getAll(collection, {});
        return eventos;
    }
    // ===========================  actualizar  ======================================
    // guardar la url de los archivos estaticos en la base de datos
    async guardarFotos(id, staticUrl){
        let { mongo, collection } = this;
        let saved = await mongo.updateOne(collection, { _id: new ObjectId(id) },
            {
                $set: {
                    imagen: staticUrl
                }
            }
        );
        return saved;
    }


}

module.exports = EventoService;