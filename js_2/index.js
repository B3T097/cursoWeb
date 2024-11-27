// DECLARACION DE VARIABLES
const apiKey = '8e19461261c0489d856b9dacd6871b19';
const language = 'es';
const urlBase = 'https://newsapi.org/v2/everything?language=' + language;
const template = `
<div class="card">
    <div class="imagen">
        <img src="__imagen__" alt="portada" srcset="">
    </div>
    <div class="title">__titulo__</div>
    <div class="autor">__autor__</div>
    <div class="descripsion">__descripcion__</div>
    <a class="btnVer" href="__link__">VER</a>
</div>`;

// Evento para asegurar que la pagina ya cargo
document.addEventListener('DOMContentLoaded', function(){

    // Recuperar el formulario
    const form = document.querySelector('#formApi');
    // Escuchamos el evento Submit o de envio
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Recuperamos los valores de los inputs
        let inputBusqueda = document.querySelector('#busqueda').value;
        let inputOrden = document.querySelector('#orderBy').value;
        let inputFechaInicio = document.querySelector('#fecha_inicio').value;
        let inputFechaFin = document.querySelector('#fecha_fin').value;
        
        // Armamos nuestra URL
        let urlFinal = urlBase;
        if (inputBusqueda != '') {
            urlFinal += '&q=' + inputBusqueda;
        }

        if (inputFechaInicio != '') {
            urlFinal += '&from=' + inputFechaInicio;
        }

        if (inputFechaFin != '') {
            urlFinal += '&to=' + inputFechaFin;
        }

        urlFinal += '&orderBy=' + inputOrden;
        urlFinal += '&pageSize=50';
        urlFinal += '&searchIn=title';
        urlFinal += '&apiKey=' + apiKey;

        console.log(urlFinal);

        // Hacemos la peticion HTTP
        fetch(urlFinal)
            .then((response) => {
                 response.json()
                    .then((articulos) => {
                        // Obtenemos los articulos
                        let articles = articulos.articles;
                        // Recuperamos el contenedor de las cartas
                        const content = document.querySelector('.apiContent');
                        // limpiamos el contenedor
                        content.innerHTML = '';
                        if (articles.length == 0) {
                            content.innerHTML = 'No se encontraron resultados.';
                        } else {
                            articles.forEach((article) => {
                                // Armamos nuestra carta 
                                let templateAux = template;
                                templateAux = templateAux.replace('__imagen__', article.urlToImage);
                                templateAux = templateAux.replace('__titulo__', article.title);
                                templateAux = templateAux.replace('__autor__', article.author);
                                templateAux = templateAux.replace('__descripcion__', article.description);
                                templateAux = templateAux.replace('__link__', article.url);

                                // Agregamos nuestra carta al DOM
                                // content.innerHTML = content.innerHTML + templateAux;
                                content.innerHTML += templateAux;
                            })
                        }
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    })
})
