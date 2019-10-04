const generalInfo = {
    precio: 15000, //precio de la hora
        // algunos juegos disponibles
    juegos: [
        {
            imageUrl: 'https://static.raru.co.za/cover/2017/01/14/5390386-l.jpg?v=1500110779',
            nombre: 'fifa 19',
            plataforma: 'ps3',
        },
        {
            imageUrl: 'data:image/jpeg;base64,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',
            nombre: 'fifa 99',
            plataforma: 'ps4',
        },
        {
            imageUrl: 'https://www.estigames.com/web/wp-content/uploads/2012/02/mario-kart-7-cover.jpg',
            nombre: 'fifa 999.1416',
            plataforma: 'ps12.3',
        },
    ],
    // horario de atención
    horario: {
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
                start: ["1","PM"],
                end: ["6","PM"]
            }
        },
    },
}

module.exports = generalInfo;

       
//         // variables necesarias para la creación de códigos 
//         this.divisorPremio = 5;
//         this.duracionEnDiasDeCodigoHora = 3;
//         this.duracionEnDiasDeCodigoPremio = 3;
//         this.cantidadDeCodigosAGenerar = 50;
//         // ==========  codigos  ========
//         this.hourCodes = []; 
//         // [
//         //     {
//         //         code: 'r3GzdQ',
//         //         created: [ 27, 8, 2019 ],
//         //         expiration: [ 6, 9, 2019 ],
//         //         type: 'hora'
//         //       },
//         //       {
//         //         code: 'uzIeWa',
//         //         created: [ 27, 8, 2019 ],
//         //         expiration: [ 6, 9, 2019 ],
//         //         type: 'hora'
//         //       },
//         // ];
//         this.prizeCodes = [];
//         // [
//         //     {
//         //         code: 'r3GzdQdi',
//         //         created: [ 27, 8, 2019 ],
//         //         expiration: [ 6, 9, 2019 ],
//         //         type: 'premio'
//         //       },
//         //       {
//         //         code: 'uzIeWaLt',
//         //         created: [ 27, 8, 2019 ],
//         //         expiration: [ 6, 9, 2019 ],
//         //         type: 'premio'
//         //       }
//         // ];
//         this.fotos = []; 
//         // ["url1, url2, url3"];
//     }
// }
