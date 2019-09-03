class Usuario{
    constructor({nombre, apellido, email, password, foto}){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        // puntos como usuario, mas no como referencia para las horas
        this.puntos = 0; 
        // el codigo que le otorga 1 hora gratis, puede que llegue a tener varios
        this.codigoPremioActual = []; // guardará objetos tipo Codigo
        this.contadorHoras = 0;
        this.foto = foto;
    }
}