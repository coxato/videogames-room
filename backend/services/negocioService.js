const MongoLib = require("../mongo/connection");
const NegocioModel = require("../models/negocio.js");
const ObjectId = require("mongodb").ObjectID();
const codeGen = require("../utils/createCodes");


class NegocioService{
    constructor(){
        this.collection = "negocio";
        this.mongo = new MongoLib();
    }

    async guardarNegocio(){
        let { mongo, collection } = this;
        let negocio = new NegocioModel();
        let saved = await mongo.createOne(collection, negocio);
        return saved;
    }

    // ##### pedir datos del negocio #####
    async datosNegocio(categorydata){
        let projection;
        switch (categorydata) {
            case "general":
                projection = { precio: 1, horario: 1, juegos: 1 }
                break;
            case "codigos":
                projection = {  divisorPremio: 1,
                                duracionEnDiasDeCodigoHora: 1,
                                duracionEnDiasDeCodigoPremio: 1,
                                cantidadDeCodigosAGenerar: 1,
                                hourCodes: 1, 
                                prizeCodes: 1
                            }
                break;
            default: projection = null; break;
        }

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

    // ##################  crear códigos  ##################
    async createCodes(tipo){
        let { mongo, collection } = this;
        // traer datos del negocio para generar codigos
        let { 
            duracionEnDiasDeCodigoHora,
            duracionEnDiasDeCodigoPremio,
            cantidadDeCodigosAGenerar,
            hourCodes,
            prizeCodes
            } = await mongo.getOne(collection, { nombre: "masplay" }, {
                duracionEnDiasDeCodigoHora: 1,
                duracionEnDiasDeCodigoPremio: 1,
                cantidadDeCodigosAGenerar: 1,
                hourCodes: 1,
                prizeCodes: 1
            });
        // revisar que tipo de codigo son, si de hora o de premio
        let diasVigente, codes;
        if(tipo == "hora"){
            diasVigente = duracionEnDiasDeCodigoHora;
            // generar codigos
            codes = codeGen(tipo, cantidadDeCodigosAGenerar, diasVigente);
            hourCodes.concat(codes);
            // guardar codigos de hora
            let saved = await mongo.updateOne(collection, { nombre: "masplay" }, 
            { $set: {
                hourCodes
                }
            });
            return saved;

        }
        // codigos de tipo premio
        else{
            diasVigente = duracionEnDiasDeCodigoPremio;
            // como los codigos de premio se dan menos veces, generar solo un tercio que los codigos de hora
            cantidadDeCodigosAGenerar = Math.floor(cantidadDeCodigosAGenerar/3);
            // generar codigos
            codes = codeGen(tipo, cantidadDeCodigosAGenerar, diasVigente);
            prizeCodes.concat(codes);
            // guardar codigos de hora
            let saved = await mongo.updateOne(collection, { nombre: "masplay" }, 
            { $set: {
                prizeCodes
                }
            });
            return saved;

        }
        
    }
    // #####################################################

    // ##################  actualizar datos ##################
    // actualizar numero de codigos, divisorPremio, duracion de los codigos
    async actualizarDatosDeCodigos({id , nombre}, divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar){
        let { mongo, collection } = this;
        let query = id ? {_id: new ObjectId(id)} : { nombre };
        let newValue = { 
            $set: {
                divisorPremio,
                duracionEnDiasDeCodigoHora,
                duracionEnDiasDeCodigoPremio,
                cantidadDeCodigosAGenerar
            } 
        };
        let updated = await mongo.updateOne(collection, query, newValue);
        return updated;

    }

    // actualizar datos del negocio
    async actualizarDatos(precio, juegos, horario){
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
    // // actualizar precio
    // async actualizarPrecio(newPrice){
    //     let { mongo, collection } = this;
    //     let updated = await mongo.updateOne(collection, {nombre: "masplay"}, { $set: {precio: newPrice}});
    //     return updated;
    // };

    // // actualizar catalogo de juegos
    // // trae un array con los juegos viejos y nuevos ya incluidos
    // async actualizarCatalogoJuegos(arrJuegos){
    //     let { mongo, collection } = this;
    //     let updated = await mongo.updateOne(collection, {nombre: "masplay"}, { $set: {juegos: arrJuegos}});
    //     return updated;
    // }
    // // actualiazar horarios
    // async actualizarHorarios(turnoCorrido, diasDeSemana, sabado, domingo){
    //     let { mongo, collection } = this;
    //     let updated = await mongo.updateOne(collection, {nombre: "masplay"}, { 
    //             $set: {
    //                 turnoCorrido,
    //                 diasDeSemana,
    //                 sabado,
    //                 domingo
    //             } 
    //         }
    //     );
    //     return updated;
    // }

    // #######################################################

}

module.exports = NegocioService;