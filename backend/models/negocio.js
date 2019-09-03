class Negocio{
    constructor(){
        this.nombre = "masplay";
        this.precio = 15000; //precio de la hora
        // algunos juegos disponibles
        this.juegos = []; 
        // horario de atención
        this.horario = {
            turnoCorrido: false,
            diasDeSemana: {
                morning: {
                    start: ["9","AM"],
                    end: ["1","PM"]
                },
                afternoon: {
                    start: ["1","PM"],
                    end: ["6","PM"]
                }
            },
            sabado: {
                morning: {
                    start: ["9","AM"],
                    end: ["1","PM"]
                },
                afternoon: {
                    start: ["1","PM"],
                    end: ["6","PM"]
                }
            },
            domingo: {
                morning: {
                    start: ["9","AM"],
                    end: ["1","PM"]
                },
                afternoon: {
                    start: ["1PM"],
                    end: ["6","PM"]
                }
            },
        };
        // variables necesarias para la creación de códigos 
        this.divisorPremio = 5;
        this.duracionEnDiasDeCodigoHora = 3;
        this.duracionEnDiasDeCodigoPremio = 3;
        this.cantidadDeCodigosAGenerar = 50;
        // ==========  codigos  ========
        this.hourCodes = []; 
        // [
        //     {
        //         code: 'r3GzdQ',
        //         created: [ 27, 8, 2019 ],
        //         expiration: [ 6, 9, 2019 ],
        //         type: 'hora'
        //       },
        //       {
        //         code: 'uzIeWa',
        //         created: [ 27, 8, 2019 ],
        //         expiration: [ 6, 9, 2019 ],
        //         type: 'hora'
        //       },
        // ];
        this.prizeCodes = [];
        // [
        //     {
        //         code: 'r3GzdQdi',
        //         created: [ 27, 8, 2019 ],
        //         expiration: [ 6, 9, 2019 ],
        //         type: 'premio'
        //       },
        //       {
        //         code: 'uzIeWaLt',
        //         created: [ 27, 8, 2019 ],
        //         expiration: [ 6, 9, 2019 ],
        //         type: 'premio'
        //       }
        // ];
        this.fotos = []; 
        // ["url1, url2, url3"];
    }
}

module.exports = Negocio;