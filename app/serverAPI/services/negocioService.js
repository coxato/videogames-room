const MongoLib = require("../mongo/connection");
const NegocioModel = require("../models/negocio.js");
const ObjectId = require("mongodb").ObjectId;


class NegocioService{
    constructor(){
        this.collection = "negocio";
        this.mongo = new MongoLib();
    }
    // ================================  crear  ===========================================
    async guardarNegocio(){
        let { mongo, collection } = this;
        let negocio = new NegocioModel();
        let saved = await mongo.createOne(collection, negocio);
        return saved;
    }

    // ##### pedir datos del negocio #####
    async datosNegocio(){
        let projection = { precio: 1, horario: 1, juegos: 1 }
        let { mongo, collection } = this;
        let data = await mongo.getOne(collection, {nombre: "masplay"}, projection);
        return data;
    }
    // ###################################
    // guardar la url de los archivos estaticos en la base de datos
    async guardarFotos(staticUrl){
        let { mongo, collection } = this;
        let saved = await mongo.updateOne(collection, { nombre: "masplay"},
            {
                $push: {
                    fotos: staticUrl
                }
            }
        );
        return saved;
    }

    
    // actualizar datos del generales negocio
    async actualizarDatosGenerales(precio, juegos, horario){
        let { mongo, collection } = this;
        let allUpdated = await mongo.updateOne(collection, {nombre: "masplay"}, {
            $set: {
                precio,
                juegos,
                horario
            }
        });
        return allUpdated;
    }

}

module.exports = NegocioService;