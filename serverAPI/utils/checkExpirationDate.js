// check expiration date, return true if the code is expired
function codeIsExpired(codeDateExpirationString){
    // console.log(`#####  the codeDateExpirationString: ${codeDateExpirationString} #####`)
    // check date
    const today = new Date();
    const codeExpirationDate = new Date(codeDateExpirationString);
    // today is still valid
    if(today < codeExpirationDate ) return false; 
    // code is expired
    else return true;
}

module.exports = codeIsExpired; 