// check expiration date, return true if the code is expired
function codeIsExpired(codeDateExpirationString){
    console.log(`#####  the codeDateExpirationString: ${codeDateExpirationString} #####`)
    // check date
    // time in Venezuela
    const today = new Date( new Date().toLocaleString("es-VE", {timeZone: "America/Caracas"}) );
    const codeExpirationDate = new Date(codeDateExpirationString);
    console.log(`esta fecha: ${today} es menor a ${codeExpirationDate} ?????`)
    console.log(`es menor???: ${today < codeExpirationDate}`)
    // today is still valid
    if(today < codeExpirationDate ) return false; 
    // code is expired
    else return true;
}

module.exports = codeIsExpired; 