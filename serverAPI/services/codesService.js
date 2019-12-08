const MongoLib = require("../mongo/connection");
const ObjectId = require("mongodb").ObjectId;
const codeGen = require("../utils/createCodes");
const codeIsExpired = require("../utils/checkExpirationDate");
const CodigoModel = require("../models/codigo");


class CodesServices{
    constructor(){
        this.collection = "codigo";
        this.mongo = new MongoLib();
    }

    // crear configuración básica de códigos
    // usar solo 1 vez
    async createCodesConfig(){
        let { mongo, collection } = this;
        const codesConfig = new CodigoModel({
            divisorPremio: 3,
            duracionEnDiasDeCodigoHora: 3,
            duracionEnDiasDeCodigoPremio: 3,
            cantidadDeCodigosAGenerar: 20,
            eleccionPremio: 'una'
        });
        let codesConfigCreated = await mongo.createOne(collection, codesConfig);
        return 'config codes created';
    }

 // ##### pedir datos del negocio #####
    async getCodes(){
        let { mongo, collection } = this;
        let data = await mongo.getOne(collection, {});
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
            } = await mongo.getOne(collection, {});

        // revisar que tipo de codigo son, si de hora o de premio
        let diasVigente, codes;
        if(tipo == "hora"){
            diasVigente = duracionEnDiasDeCodigoHora;
            // generar codigos
            codes = codeGen(tipo, cantidadDeCodigosAGenerar, diasVigente);
            hourCodes = hourCodes.concat(codes);
            // guardar codigos de hora
            let saved = await mongo.updateOne(collection, {}, 
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
            // cantidadDeCodigosAGenerar = Math.floor(cantidadDeCodigosAGenerar/3);
            cantidadDeCodigosAGenerar = 1;
            // generar codigos
            codes = codeGen(tipo, cantidadDeCodigosAGenerar, diasVigente);
            prizeCodes = prizeCodes.concat(codes);
            // guardar codigos de hora
            let saved = await mongo.updateOne(collection, {}, 
            { $set: {
                prizeCodes
                }
            });
            return saved;
        }
        
    }


    // ##################  actualizar datos ##################
    // actualizar numero de codigos, divisorPremio, duracion de los codigos
    async actualizarDatosDeCodigos({ divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar, eleccionPremio }){
        let { mongo, collection } = this;
        let newValue = { 
            $set: {
                divisorPremio,
                duracionEnDiasDeCodigoHora,
                duracionEnDiasDeCodigoPremio,
                cantidadDeCodigosAGenerar,
                eleccionPremio
            } 
        };
        let updated = await mongo.updateOne(collection, {}, newValue);
        return updated;
    }

    // $$$$$$$$$$$$$$$$$$  check codes  $$$$$$$$$$$$$$$$$$$$$$
    async checkCode(type, code, userId, date=null){
        console.log("el id que llega ", userId)
        let { mongo, collection } = this;
        // neccessary query for interact with mongoDB 
        let queryType = type == 'hour' ? "hourCodes" : "prizeCodes"; 
        
        // #######  check if the code exist  #######
        // { [key] : value } ES6 feature
        let codeExist = await mongo.getOne(collection, { [queryType+'.code']: code }, 
            { // projection
                [queryType+'.$']: 1,
                divisorPremio: 1,
                duracionEnDiasDeCodigoPremio: 1
            });
        console.log(codeExist)
        // #######  if the code not exist  #######
        if(!codeExist) return { success: false, fail: true, used: false};
        // #######  if the code is already used  #######
        if(codeExist[queryType][0].isUsed ) return { success: false, fail: false, used: true }
        // #######  check expiration dates  #######
        // code object
        const codeObject = codeExist[queryType].filter( c => c.code === code);
        // #######  send the code to check date with codeIsExpired mehotd  #######
        const expirationDay = codeObject[0].expiration.reverse().join('/');
        if(!codeIsExpired(expirationDay)){
            // if the code is all valid return success true and change the props of the code
            // update Code, because if the code is valid, then it will not be valid, you know, only use the code one time
            await mongo.updateOne(collection, 
                { [queryType+'.code']: code },
                 {
                    $set: { 
                        [queryType+'.$.isValid'] : false,
                        [queryType+'.$.isUsed'] : true,
                    } 
             });
            // ===== add points and codes to user =====
            // if hour, increment the hours count and points
            if(type=="hour"){
                await mongo.updateOne('user', { _id: new ObjectId(userId) }, { 
                    $inc: {
                        contadorHoras: 1,
                        puntos: 100 
                    } 
                } );
                // return success object to frontend if all pass
                return { success: true, fail: false, used: false };
            }
            
            // return success obj to frontend if is prize code
            // no se agregan puntos al usuario porque los puntos solo
            // se agregan cuando se crea un codigo de premio,
            // mas no cuando se revisa, cuando solo se revisa basta con ver si
            // el codigo de premio existe y de ser así, mandar un objeto success para el frontend
            else{
                return { success: true, fail: false, used: false };
            }
            

        }
        // #######  date is expirated  #######
        else{
            return { success: false, fail: true, used: false , expired: true, expirationDay};
        }


    }
 
        

    // $$$$$$$$$$$$$$$$  create one code $$$$$$$$$$$$$$
    async createSimpleCode(type, userId){
        let { mongo, collection } = this;
        
        if(type == "prize"){
            // get 
            let codeData = await mongo.getOne(collection, {}, {divisorPremio:1, duracionEnDiasDeCodigoPremio:1, duracionEnDiasDeCodigoHora:1, _id: 0});

            let user = await mongo.getOne("user", {_id: new ObjectId(userId)});
            // check is hour quantity is valid
            if( user.contadorHoras >= Number(codeData.divisorPremio) ){
                // create prize code
                let prizeCode = codeGen('prize', 1, codeData.duracionEnDiasDeCodigoPremio, user.email );
                // substract hours to user
                let newHoursQty = user.contadorHoras - codeData.divisorPremio;
                // update the user points and prize 
                await mongo.updateOne("user", { _id: new ObjectId(userId)}, {
                    // add code to prizes
                    $push: { codigoPremioActual: prizeCode },
                    // increment 300 points
                    $inc: { puntos: 300 },
                    // set the new hours quantity
                    $set: { contadorHoras: newHoursQty }
                } );
                // update codes in mongoDB, push code to prizeCodes
                await mongo.updateOne(collection, {}, { $push: {prizeCodes: prizeCode } });
                // return success object to frontend if all pass
                return { success: true, fail: false, used: false, code: prizeCode };
            }
            // hours quantity is not valid
            else{
                return { success: false, fail: true };
            }
        }
    }
    

    // =====  get simple data like divisorPremio  =====
    async getSimpleData(){
        let { mongo, collection } = this;
        let data = await mongo.getOne(collection, {}, { divisorPremio: 1, eleccionPremio: 1, _id: 0 });
        return data;
    }

    // actualizar si un código a sido usado o no
    async updateGivenOrUsedCode(type,code, boolean = true){
        // make sure boolean is true or false
        boolean = typeof boolean != 'string' ? boolean : boolean === "true" ? true : false;

        let { mongo, collection } = this;
        let query = (type == 'hour' || type == 'hora') ? 'hourCodes' : 'prizeCodes';
        // props to set in arrayObject code element, <<isUsed>> for prize, <<isGiven>> for hour
        let setProps;
        if(type == 'hour' || type == 'hora') setProps = { 
            [query+'.$.isGiven']: boolean,
        };
        else setProps = { 
            [query+'.$.isUsed']: boolean,
            [query+'.$.isValid']: !boolean
        };
        // update code props
        let codeToUpdate = await mongo.updateOne(collection,
         { [query+'.code']: code },
         { $set: setProps } 
        );
        // return updated message
        return 'code updated';
    }


    // ******************  check expirationDate of all codes  *****************
    // if a code is expired that code is not valid
    async checkExpirationDateAllCodesAndReturnThem(){
        let {collection, mongo} = this;

        let allCodes = await this.getCodes();
        let { hourCodes, prizeCodes } = allCodes;
        // function to iterate all the codes and check dates
        const checkCodesDate = ObjCodesArray => {
                for(let codeObj of ObjCodesArray ){
                // transform Array [DD,MM,YYYY] to string YYYY/MM/DD
                let copyExpirationArr = [...codeObj.expiration];
                let expirationString = copyExpirationArr.reverse().join('/'); // YYYY/MM/DD
                let isExpired = codeIsExpired(expirationString);
                // set the code as invalid code
                if(isExpired) codeObj.isValid = false;

            }
        }

        // check hour codes expiration date
        checkCodesDate(hourCodes);
        // check prize codes expiration date
        checkCodesDate(prizeCodes);

        // save the checked codes in mongoDB
        await mongo.updateOne(collection, {}, {
            $set: {
                hourCodes,
                prizeCodes
            }
        });
        // return codes for frontend
        return {
            hourCodes,
            prizeCodes
        }


    }

    // delete all invalid codes
    async deleteInvalidCodes(){
        let { mongo, collection } = this;
        let allCodes = await mongo.getOne(collection, {});
        // get hour and prize codes
        let {hourCodes, prizeCodes} = allCodes;
        // only save valid codes by filter method
        hourCodes = hourCodes.filter( code => code.isValid );
        prizeCodes = prizeCodes.filter( code => code.isValid );
        // update codes with only valid codes
        await mongo.updateOne(collection, {} , 
            { 
                $set: {
                hourCodes,
                prizeCodes
                }
            }
        );
        return 'invalid codes deleted';
    }

}

module.exports =  CodesServices;