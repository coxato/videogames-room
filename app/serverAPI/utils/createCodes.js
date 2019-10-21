const CHARACTERS = "QWERTYUIOPZXCVBNM1234567890ASDFGHJKLzxcvbnmasdfghjklqwertyuio1234567890";
const cLength = CHARACTERS.length;
const nCaracteresPremio = 8;
const nCaracteresHora = 6;

// return the date of expiration in array with [DD,MM,YY] format [12,12,1999]
function setDurationsDays( date , qtyDays ){
    let resultDays = new Date(date);
    resultDays.setDate( resultDays.getDate() + qtyDays );
    return [resultDays.getDate(), resultDays.getMonth() + 1, resultDays.getFullYear()];
}

function createCodes(tipo, cantidadCodigos = 1, diasVigente, user = ''){
    // today new Date()
    let today = new Date();
    // save the created date in array with [DD,MM,YY] format [12,12,1999]
    let created = [today.getDate(), today.getMonth() + 1, today.getFullYear()],
    nCharacters = tipo === "hora" ? nCaracteresHora : nCaracteresPremio,
    arrCodigos = [];

    for(let i = 0; i < cantidadCodigos; i++){
        // generate the random hash
        let code = "";
        for(let j = 0; j < nCharacters; j++){
            let rIndex = Math.round(Math.random() * (cLength - 1));
            code += CHARACTERS[ rIndex ];
        }
        // add code for array
        arrCodigos.push({
            code,
            created,
            user,
            expiration: setDurationsDays(Number(today), Number(diasVigente)), // expiration date
            type: tipo,
            isValid: true,
            isUsed: false,
            isGiven: false
        });
    }

    // return all the codes or just 1 if is type prize
    return tipo === "hora" ? arrCodigos : arrCodigos[0];
}

module.exports = createCodes;

