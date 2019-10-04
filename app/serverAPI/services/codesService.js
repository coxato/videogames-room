const MongoLib = require("../mongo/connection");
const NegocioModel = require("../models/negocio.js");
const ObjectId = require("mongodb").ObjectId;
const codeGen = require("../utils/createCodes");


class CodesServices{
    constructor(){
        this.collection = "negocio";
        this.mongo = new MongoLib();
    }
 // ##### pedir datos del negocio #####
    async getCodes(){
        let projection = {  divisorPremio: 1,
                            duracionEnDiasDeCodigoHora: 1,
                            duracionEnDiasDeCodigoPremio: 1,
                            cantidadDeCodigosAGenerar: 1,
                            hourCodes: 1, 
                            prizeCodes: 1
                        }

        let { mongo, collection } = this;
        let data = await mongo.getOne(collection, {nombre: "masplay"}, projection);
        return data;
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
            console.log("###### en los servicios: tipo, cantidadDeCodigosAGenerar y diasVigente", tipo, cantidadDeCodigosAGenerar, diasVigente);
            codes = codeGen(tipo, cantidadDeCodigosAGenerar, diasVigente);
            console.log("\n los putos codigos generados: \n", codes);
            hourCodes = hourCodes.concat(codes);
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


    // ##################  actualizar datos ##################
    // actualizar numero de codigos, divisorPremio, duracion de los codigos
    async actualizarDatosDeCodigos({ divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar }){
        let { mongo, collection } = this;
        let newValue = { 
            $set: {
                divisorPremio,
                duracionEnDiasDeCodigoHora,
                duracionEnDiasDeCodigoPremio,
                cantidadDeCodigosAGenerar
            } 
        };
        let updated = await mongo.updateOne(collection, {nombre: 'masplay'}, newValue);
        return updated;
    }

}

module.exports =  CodesServices;