const CHARACTERS = "QWERTYUIOPZXCVBNM1234567890ASDFGHJKLzxcvbnmasdfghjklqwertyuio1234567890";
const cLength = CHARACTERS.length;
const nCaracteresPremio = 8;
const nCaracteresHora = 6;


function addDurationsDays( date , qtyDays ){
    let resultDays = new Date(date);
    resultDays.setDate( resultDays.getDate() + qtyDays );
    return [resultDays.getDate(), resultDays.getMonth() + 1, resultDays.getFullYear()];
}

function createCodes(tipo, cantidadCodigos, diasVigente){
    // today new Date()
    const today = new Date();
    let created = [today.getDate(), today.getMonth() + 1, today.getFullYear()],
    nCharacters = tipo === "hora" ? nCaracteresHora : nCaracteresPremio,
    arrCodigos = [];

    for(let i = 0; i < cantidadCodigos; i++){
        // generate the random hash
        let code = "";
        for(let j = 0; j < nCharacters; j++){
            code += CHARACTERS[ Math.round(Math.random() * (cLength - 1) ) ];
        }
        // add code for array
        arrCodigos.push({
            code,
            created,
            expiration: addDurationsDays( today, diasVigente), // expiration date
            type: tipo,
            isValid: true
        });
    }

    return arrCodigos;
}

module.exports = createCodes;
