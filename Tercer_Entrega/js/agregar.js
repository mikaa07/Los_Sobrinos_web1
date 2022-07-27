

document.addEventListener('DOMContentLoaded', cargar);

function cargar() {
    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}

//carga dinamica de tabla
document.getElementById("agregar1").addEventListener("click",agregar);
document.getElementById("agregar3").addEventListener("click",agregar3);


let url = 'https://web-unicen.herokuapp.com/api/groups/088-Silvas/variedades';

getvariedades(); //get envia datos utilizando url
//traigo los datos almacenados en el servidor
let bodytabla= document.getElementById("tabla");


    function agregar() {
        event.preventDefault();
        //preventDefault() cancela la acción o respuesta por defecto
        let variedadpizza = document.querySelector('#variedadpizza').value;
        let preciopizza = document.querySelector('#preciopizza').value; 
        let variedadempanada = document.querySelector('#variedadempanada').value;
        let precioempanada = document.querySelector('#precioempanada').value;
    
        let variedades = {
            "thing": {
                "variedadpizza": variedadpizza,
                "preciopizza": preciopizza,
                "variedadempanada": variedadempanada,
                "precioempanada": precioempanada,
            }
        };
    
    
        fetch(url, {
            'method': 'POST', //creo recxurso en el servidor
            //enviar información desde el cliente 
            //paraa que sea procesada y actualice o agregue información en el servidor
            'headers': { 'Content-Type': 'application/json' },
            'mode':'cors',
            'body': JSON.stringify(variedades) //convierte el json en texto
        }).then(function (r) {
            if (!r.ok) {
                console.log("error");
            }
            getvariedades();
    
        }) //si obtengo una respuesta valida no se ejecuta
            .catch(function (e) {
                console.log(e)
            })
    }
    
    function getvariedades() {
        document.querySelector('#tabla').innerHTML = "";
        fetch('https://web-unicen.herokuapp.com/api/groups/088-Silvas/variedades')
            .then(response => { return response.json() })
            .then(json => cargarvariedades(json.variedades));
    
    }
    
    function cargarvariedades(variedades) {
        bodytabla.innerHTML="";
        for(let elem of variedades){
            //agrego filas con sus columnas
            let tr= document.createElement("tr");
            let td1= document.createElement("td");
            let td2= document.createElement("td");
            let td3= document.createElement("td");
            let td4= document.createElement("td");
        //agrego boton borrar y boton editar 
        //si no agrego una variedad boton borrar y editar no existe 
            let btnborrar= document.createElement("button");
            let btneditar= document.createElement("button");
            btnborrar.innerText= "BORRAR";
            btneditar.innerText= "EDITAR";

            btnborrar.addEventListener("click", borrar);
            btneditar.addEventListener("click",editar);

            //td lo que va dentro de la celda de la fila
            td1.innerHTML= elem.thing.variedadpizza;
            td2.innerHTML=elem.thing.preciopizza;
            td3.innerHTML=elem.thing.variedadempanada;
            td4.innerHTML=elem.thing.precioempanada;

            tr.id= elem._id;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(btnborrar);
            tr.appendChild(btneditar);

            //Append child inserta un nuevo nodo dentro del DOM
            bodytabla.appendChild(tr);
        }
       
    }

    function borrar(){
        let id=event.target.parentNode.id;
        deleteVarie(id);
    }

    function editar(){
        let id=event.target.parentNode.id;
        //event.target devuelve el elemento DOM, 
        //por lo que puede recuperar cualquier propiedad/atributo que tenga un valor
        putVarie(id);
    }

    
    function deleteVarie(id) {
        deleteUrl = url + '/' + id;
        fetch(deleteUrl, {
            method: 'DELETE', //para borrar un recurso del servidor
            "mode": "cors"
        }).then(function (r){
            if (!r.ok){
                console.log("NO SE PUDO ELIMINAR");
            }
            if(r.ok){
                let fila= document.getElementById(id);
                fila.remove();
            }

        })
            
    }

    function agregar3(){
        event.preventDefault();
        for(let i=0;i<=2;i++){
            agregar();
        }
    }
    
    function putVarie(id) {
        let variedadpizza = document.querySelector('#variedadpizza').value
        let preciopizza = document.querySelector('#preciopizza').value
        let variedadempanada = document.querySelector('#variedadempanada').value
        let precioempanada = document.querySelector('#precioempanada').value;
        let editUrl = url + '/' + id
        let body =
        {
            "thing": {
                "variedadpizza": variedadpizza,
                "preciopizza": preciopizza,
                "variedadempanada": variedadempanada,
                "precioempanada": precioempanada,
            }
        };
        fetch(editUrl, {
            'method': 'PUT', //put sirve para actualizar datos
            //actualizar un recurso 
            'mode': 'cors',
            'headers': {
                'Content-type': 'application/json'
            },
    
            'body': JSON.stringify(body)
        })
            .then(function (r){
                if (r.ok){
                    getvariedades();
                }
                if (!r.ok){
                    console.log("NO SE PUDO EDITAR");
                }
            })
    
    
    }
  

}

