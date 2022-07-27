"use strict";

//random variable a la que le deposito un num aleatorio

let random= Math.floor(Math.random() *50 + 1);


//asocio captchagenerado(variable que cree) al id captchagenerado(boton).

//busco en document el elemento id:captchagenerado

//let son variables locales

let captchaGenerado = document.getElementById("captchaGenerado");

//agarro nuevo captchagenerado(no el de arriba) y le doy el boton aleatorio

//que tenia en random

captchaGenerado.value =random;

//xq value? los botones son los unicos que llevan value

//si no es boton va innerHTML al final. siempre que lo asocie


//creo variable resultado y la asocio al boton enviar

let resultado = document.getElementById("comparar");

//comparar es el boton enviar


//a resultado le creo un evento(que cada vez que clickeo valide)

resultado.addEventListener("click",validacion);

function validacion(){
    
    let captchaUsuario = document.getElementById("captchaUsuario");
    if(random !=captchaUsuario.value){
        alert("El captcha es invalido");
        event.preventDefault();
    }
    else{
        alert("su respuesta fue enviada con exito");
    }    
}




