class Codigo{
	constructor({divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar, eleccionPremio}){
		// variables necesarias para la creación de códigos 
        this.divisorPremio = divisorPremio;
        this.duracionEnDiasDeCodigoHora = duracionEnDiasDeCodigoHora;
        this.duracionEnDiasDeCodigoPremio = duracionEnDiasDeCodigoPremio;
        this.cantidadDeCodigosAGenerar = cantidadDeCodigosAGenerar;
        this.eleccionPremio = eleccionPremio;
        // ==========  codigos  ========
        this.hourCodes = []; 
        this.prizeCodes = [];
	}
}

module.exports = Codigo;