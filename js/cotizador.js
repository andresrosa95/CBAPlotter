//Creacion de la Clase DatosPresupuesto

class DatosPresupuesto {
    constructor(nombre, apellido, email, cliente, servicio, vehiculo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.cliente = cliente;
        this.servicio = servicio;
        this.vehiculo = vehiculo;
    }
}

//Creacion de la Clase Cotizador

class Cotizador {

    servicio = {
        "Cambio de Color": 30000,
        "Grafica Vehicular": 25000
    }
    vehiculo = {
        "Hatckback/Bi-cuerpo": 1,
        "Sedan/Tri-cuerpo": 1.25,
        "Familiar/Monovolumen/Utilitario Pequeño": 1.5,
        "Pick up/Camioneta/Todoterreno": 1.75,
        "Utilitario Grande/Traffic": 2,
        "Camión/Colectivo": 3

    }

    constructor(datosPresupuesto) {
        this.datosPresupuesto = datosPresupuesto
    }

// Funcion para calcular el precio de la cotizacion teniendo en cuenta el tipo de vehiculo, el servicio y si es o no cliente

    cotizar() {
        const precioBase = this.servicio[this.datosPresupuesto.servicio] * this.vehiculo[this.datosPresupuesto
            .vehiculo]
        return this.datosPresupuesto.cliente == "Si" ? precioBase * 0.9 : precioBase
    }

}

$("#formulario").submit(function (e) {
    procesarFormulario(e)
})


let cotizacion
let contenedor = $("#infoNueva");


$(document).ready(function () {
    console.log("El DOM esta listo");
});

function procesarFormulario(e) {
    e.preventDefault();
    let form = leerFormulario(e);
    if (validarFormulario(form)) {
        let datosPresupuesto = crearDatosPresupuesto(form);
        presentarEnElDom(datosPresupuesto);
    }
}

// Funcion para comprobar que los datos ingresados sean correctos

function validarFormulario(form) {

    let nombreValido = validarPalabra(form.nombre);
    let apellidoValido = validarPalabra(form.apellido);
    let emailValido = validarEmail(form.email);

    if (!nombreValido) agregarErrorAlDom("Nombre");
    if (!apellidoValido) agregarErrorAlDom("Apellido");
    if (!emailValido) agregarErrorAlDom("Email");

    return nombreValido && apellidoValido && emailValido
}



function agregarErrorAlDom(campoErroneo) {
    $("#infoNueva").html(`Revisar ${campoErroneo}`);
}

// Revisamos que los campos ingresados no sean ni indefinidos ni vacios ni menores a 2 caracteres.

function validarPalabra(palabra) {
    return palabra != undefined && palabra != "" && palabra.length > 2;
}

// Revisamos que el Email contenga @

function validarEmail(email) {
    return validarPalabra(email) && email.includes("@");
}

// Agregamos la informacion del formulario a DatosPresupuesto

function crearDatosPresupuesto(form) {
    return new DatosPresupuesto(form.nombre, form.apellido, form.email, form.cliente, form.servicio,
        form.vehiculo);
}

// Obtenemos la informacion del Formulario

function leerFormulario(e) {
    e.preventDefault();

    return {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        email: $("#email").val(),
        cliente: $("#clientesino").val(),
        servicio: $("#elegirServicio").val(),
        vehiculo: $("#elegirVehiculo").val(),
    }
}

// Definimos el mensaje al presionar el boton Cotizar y todos los otros eventos que surgen de el

function presentarEnElDom(datosPresupuesto) {
    let precioCot = new Cotizador(datosPresupuesto).cotizar()

    let mensajeCotizacion =
        `<h3 id="mensajeCoti" style="display: none" >Hola ${datosPresupuesto.nombre}!! Gracias por utilizar el cotizador!
    Considerando que ${datosPresupuesto.cliente} eres cliente, 
    el precio para el servicio de ${datosPresupuesto.servicio} 
    para un vehículo del tipo ${datosPresupuesto.vehiculo}, 
    es de: 
    <br>
    <h1 id="precioCoti" style="display: none" > $${precioCot}</h1></h3> 
    <br>
    <button id="botonAgregar">Agregar a tu Wishlist</button>`;

    $("#infoNueva").html(mensajeCotizacion);

    // Definimos el evento del boton Agregar

    $(`#botonAgregar`).on('click', function () {
        $("#wishList").show();

        $("#wishList").html(`<div id="wishListDom" style="display: none" ><p>Tu WishList</p> <button id="botonEnviar"> ENVIAR</button> <button id="botonEliminar">ELIMINAR</button> <br> 
    <p>Servicio: ${datosPresupuesto.servicio} para Vehículo del tipo ${datosPresupuesto.vehiculo} --- $${precioCot}  </p> <div id="cotiEnviada"></div></div>`);
        
        // Definimos el evento del boton Enviar

        $(`#botonEnviar`).on('click', function () {
            $("#cotiEnviada").html(`<p id="cotiMensaje">¡COTIZACION ENVIADA! En las próximas 24hs nos estaremos comunicando con usted.</p>`);
        })
        // Definimos el evento del boton Elimiar

        $(`#botonEliminar`).on('click', function () {
            $("#wishListDom").remove();
        })

        aplicarAnimaciones();

    });

    aplicarAnimaciones();

    localStorage.setItem('nombre', $("#nombre").val());
    localStorage.setItem('apellido', $("#apellido").val());
    localStorage.setItem('email', $("#email").val());
    localStorage.setItem('mensajeCotizacion', mensajeCotizacion)
}

// Definimos el evento del boton Cotizar

$(`#botonCotizacion`).on('click', function () {
    let localMensajeCotizacion = localStorage.getItem('mensajeCotizacion');
    $("#infoNueva").html(localMensajeCotizacion);
    aplicarAnimaciones();

});

// Funcion con las Animaciones a aplicar

function aplicarAnimaciones() {
    $("#mensajeCoti").css({
            "background-color": "black",
            "font-size": "25px"
        })
        .fadeIn(1000);
    $("#textonuevo").css("background-color", "black");
    $("#precioCoti").css({
            "background-color": "black",
            "font-size": "45px"
        })
        .slideDown(2000);
    $("#wishListDom").css({
            "background-image": "url(../assets/img/wishlist.png"
        })
        .fadeIn(2000);
}


$(() => {

    const URLOCAL = 'js/probando.json'
    
    $.get(URLOCAL, (response, status) => {
        if (status == 'success') {
            console.log(response);
            console.log(`hola ${response.precioCambioColor}`);
            const multi = response.precioCambioColor
        }
    })

})
