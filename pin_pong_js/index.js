// VARIABLES
let ancho = 500;
let alto = 500;
let posicionRauqetaIzq = 300;
let posicionRauqetaDer = 200;
let posicionPelota = {
    x: 450,
    y: 210
};
let direccionX = 1;
let direccionY = 1;

const sizePelota = 10;
const altoRaqueta = 60;
const anchoRaqueta = 10;

let velocidadPelota = 10;

let puntaje = {
    azul: 0,
    rojo: 0
};
let spanAzul = null;
let spanRojo = null;

document.addEventListener('DOMContentLoaded', function() {
    spanAzul = document.querySelector("#azul");
    spanRojo = document.querySelector("#rojo");
    
    let canvas = document.querySelector('canvas'); 
    let ctx = canvas.getContext('2d');
    canvas.width = ancho;
    canvas.height = alto;

    document.addEventListener('keydown', function(event){
        switch (event.key) {
            case 'w':
            case 'W':
                posicionRauqetaIzq -= 10;
                break;
            case 's':
            case 'S':
                posicionRauqetaIzq += 10;
                break;
            case 'ArrowUp':
                posicionRauqetaDer -= 10;
                break;
            case 'ArrowDown':
                posicionRauqetaDer += 10;
                break;
        
            default:
                break;
        }
    })
    update(ctx);
    setInterval(function(){
        update(ctx);
    }, velocidadPelota)
    
});


function update(ctx)
{
    ctx.clearRect(0, 0, alto, ancho);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, ancho, alto);

    // LOGICA DE PELOTA
    rebotePelota();
    direccionPelota();

    // CHOQUE RAQUETA
    // AZUL
    if (posicionPelota.x <= 20 + anchoRaqueta 
        && posicionPelota.y >= posicionRauqetaIzq
        && posicionPelota.y <= posicionRauqetaIzq + altoRaqueta) {
        direccionX = 1;
    }


    // ROJA
    let posicionX_raquetaRoja = ancho - 20 - anchoRaqueta;
    if (posicionPelota.x + sizePelota >= posicionX_raquetaRoja
        &&  posicionPelota.y >= posicionRauqetaDer
        && posicionPelota.y <= posicionRauqetaDer + altoRaqueta) {
        direccionX = 0;
    }

    

    dibujarPelota(posicionPelota.x, posicionPelota.y, ctx);
    dibujarRaqueta(posicionRauqetaIzq, 'izq', ctx);
    dibujarRaqueta(posicionRauqetaDer, 'der', ctx);
}

function direccionPelota()
{
    if (direccionX === 1) {
        posicionPelota.x++;
    } else if(direccionX === 0){
        posicionPelota.x--;
    }

    if (direccionY === 1) {
        posicionPelota.y--;
    } else if(direccionY === 0){
        posicionPelota.y++;
    }
}

function rebotePelota()
{
    if (posicionPelota.y >= alto - sizePelota) {
        direccionY = 1;
    }

    if (posicionPelota.y <= 0) {
        direccionY = 0;
    }

    // CASO DE PUNTAJE
    if (posicionPelota.x >= ancho - sizePelota) {
        direccionX = 0;
        puntaje.azul++;
        if (spanAzul != null) {
            spanAzul.innerHTML = puntaje.azul;
        }
    }

    if (posicionPelota.x <= 0) {
        direccionX = 1;
        puntaje.rojo++;
        if (spanRojo != null) {
            spanRojo.innerHTML = puntaje.rojo;
        }
    }
}

function dibujarPelota(x, y, ctx)
{
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, sizePelota, sizePelota);
}

function dibujarRaqueta(y, lado, ctx)
{
    if (y > alto) {
        y = alto - altoRaqueta;
    }

    if (y < 0) {
        y = 0;
    }

    if (lado === 'izq') {
        ctx.fillStyle = 'blue';
        ctx.fillRect(20, y, anchoRaqueta, altoRaqueta);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(ancho - 20 - anchoRaqueta, y, anchoRaqueta, altoRaqueta);
    }
}