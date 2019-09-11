module.exports = class Evento{
    constructor({titulo, descripcion, fechaComienzo = "", fechaFinal = "", fechaMaximaInscripcion = "", premio, imagen = "", costoInscripcion, horaComienzo}){
        this.titulo = titulo ;
        this.descripcion =  descripcion;
        this.fechaComienzo = fechaComienzo;
        this.fechaFinal = fechaFinal;
        this.fechaMaximaInscripcion = fechaMaximaInscripcion;
        this.premio = premio;
        this.imagen = imagen;
        this.costoInscripcion = costoInscripcion;
        this.horaComienzo = horaComienzo;
    }
}