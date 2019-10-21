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
                    start: ["1","PM"],
                    end: ["6","PM"]
                }
            },
        };
        this.fotos = []; 
    }
}

module.exports = Negocio;