const MongoLib = require("../mongo/connection");
const EventoModel = require("../models/eventos");
const ObjectId = require("mongodb").ObjectId;


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

    async updateEvent(id, newValues ){
        let { mongo, collection } = this;
        let newObj = {};
        for(let key in newValues){
            if(key!='_id') newObj[key] = newValues[key];
        }
        let updated = await mongo.updateOne(collection, { _id: new ObjectId(id) }, 
            { 
                $set: {
                    ...newObj
                }
            } );
        return updated;
    }

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


    // ======================  eliminar datos  ================
    async deleteEvent(id){
        let { mongo, collection } = this;
        let deleted = await mongo.deleteOne(collection, { _id: new ObjectId(id)});
        return deleted;        
    }



}

module.exports = EventoService;