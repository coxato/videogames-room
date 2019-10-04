class Usuario{
    constructor({nombre, apellido, email, password}){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        
        // puntos como usuario, mas no como referencia para las horas
        this.puntos = 0; 
        
        // el codigo que le otorga 1 hora gratis, puede que llegue a tener varios
        this.codigoPremioActual = []; // guardará objetos tipo Codigo
        
        // horas que se van contando y se reinician a 0 una vez que se alcanza
        // el numero de horas minimas para ganar un premio
        this.contadorHoras = 0;

        this.foto = '';
    }
}

module.exports = Usuario;