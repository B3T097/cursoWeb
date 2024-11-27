// DECLARACION DE VARIABLES
const urlBase = 'http://localhost:3000/'; 
const template = `
<div class="card">
    <div class="imagen">
        <img src="foto.webp" width="150" alt="portada" srcset="" />
    </div>
    <div class="nombre">__id__ : __nombre__</div>
</div>`;

// VARIABLES GLOBALEs
let ultimoId = 0;
let usuarios = [];

// Evento para asegurar que la pagina ya cargo
document.addEventListener('DOMContentLoaded', function () {
    getData();
    // Recuperar el formulario
    const form = document.querySelector('#formApi');
    // Escuchamos el evento Submit o de envio
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Recuperamos los valores de los inputs
        let inputNombre = document.querySelector('#nombre').value;
        const urlFinal = urlBase + 'users';

        // let form = new FormData();
        // form.append('nombre', inputNombre);
        // Hacemos la peticion HTTP
        fetch(urlFinal, {
            method: 'POST',//POST Es para Agrear un nuevo registro
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: (Number(ultimoId) + 1) + "", name: inputNombre })
        }).then((reponse) => 
            response.json()
                .then((data) => console.log(data))
        )
    })

    // Aqui vamos a actualizar un usuario
    // Recuperar el formulario
    const formActualizar = document.querySelector('#formApiPut');

    // Escuchamos el evento Submit o de envio
    formActualizar.addEventListener('submit', function (event) {
        event.preventDefault();
        // Recuperamos los valores de los inputs
        let inputNombre = document.querySelector('#nombreActualizar').value;
        let inputId = document.querySelector('#idUsuario').value;
        if (inputId == 0) {
            alert("Seleccione un id");
            return;
        }
        const urlFinal = urlBase + 'users/' + inputId;

        // let form = new FormData();
        // form.append('nombre', inputNombre);
        // Hacemos la peticion HTTP
        fetch(urlFinal, {
            method: 'PUT', //PUT Es para Actualizar un registro que ya existe
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: inputId + "", name: inputNombre })
        }).then((reponse) => response.json()
        .then((data) => {
            console.log(data);
        }))
    })
})

// FUNCION ES PARA OBTENER LOS DATOS
function getData() {
    const url = urlBase + 'users';
    fetch(url)
        .then((response) => {
            response
                .json()
                .then((data) => {
                    const content = document.querySelector('.apiContent');
                    // limpiamos el contenedor
                    content.innerHTML = '';
                    if (data.length == 0) {
                        content.innerHTML = 'No se encontraron resultados.';
                    } else {
                        usuarios = data;
                        ultimoId = data.reduce(function(prev, current){
                            if (ultimoId.id > current.id) {
                                return ultimoId.id;
                            } else {
                                return current.id;
                            }
                        }, ultimoId);

                        let options = '';
                        data.forEach((usuario) => {
                            options += `<option value="${usuario.id}">${usuario.id} - ${usuario.name}</option>`;
                            // Armamos nuestra carta 
                            let templateAux = template;
                            templateAux = templateAux.replace('__id__', usuario.id);
                            templateAux = templateAux.replace('__nombre__', usuario.name);

                            // Agregamos nuestra carta al DOM
                            // content.innerHTML = content.innerHTML + templateAux;
                            content.innerHTML += templateAux;
                        })

                        let select = document.querySelector('#idUsuario');
                        select.innerHTML = `
                        <option value="0" selected disabled>Seleccione un id</option>
                        ` +options;
                    }
                })
        })
}
