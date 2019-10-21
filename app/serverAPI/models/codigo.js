class Codigo{
	constructor({divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar}){
		// variables necesarias para la creación de códigos 
        this.divisorPremio = divisorPremio;
        this.duracionEnDiasDeCodigoHora = duracionEnDiasDeCodigoHora;
        this.duracionEnDiasDeCodigoPremio = duracionEnDiasDeCodigoPremio;
        this.cantidadDeCodigosAGenerar = cantidadDeCodigosAGenerar;
        // ==========  codigos  ========
        this.hourCodes = []; 
        this.prizeCodes = [];
	}
}

module.exports = Codigo;