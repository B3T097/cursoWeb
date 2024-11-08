document.addEventListener('DOMContentLoaded', function(event){
    // let usuarios = [
    //     {
    //         id: 1,
    //         gender: 'H',
    //         name: 'Alberto',
    //         lastname: 'Lazaro'
    //     },
    //     {
    //         id: 2,
    //         gender: 'M',
    //         name: 'Perla',
    //         lastname: 'Salazar'
    //     },
    //     {
    //         id: 3,
    //         gender: 'H',
    //         name: 'Daniel',
    //         lastname: 'Aros'
    //     },
    //     {
    //         id: 4,
    //         gender: 'H',
    //         name: 'Rodrigo',
    //         lastname: 'Javier'
    //     },
    // ];

    // let frutas = [ 'manzana', 'naranja', 'mandarina', 'sandia', 'uva' ];
    // for (let i = 0; i < frutas.length; i++) {
    //     let fruta = frutas[i];
    //     // console.log(fruta);
    // }

    // frutas.forEach((fruta) => console.log(fruta))

    // console.log(usuarios);

    // let nombres = usuarios.map((usuario) => {
    //     return `${ usuario.name } ${ usuario.lastname }`;
    // })
    // let nombres = usuarios.map((usuario) => usuario.name + ' ' + usuario.lastname)

    // console.log(nombres);



    // let mujeres = usuarios.filter((usuario) => usuario.gender == 'M');

    // console.log('Mujeres', mujeres);

    // let sumaIds = usuarios.reduce((valorAnterior, itemActual, index) => {
    //     return valorAnterior + itemActual.id;
    // }, 0 );

    // usuarios.push({
    //     id: 5,
    //     gender: 'M',
    //     name: 'sofia',
    //     lastname: 'perez'
    // });

    // console.log(usuarios);

    // usuarios.pop();

    // console.log(usuarios);

    // console.log(usuarios.slice(2, 3));

    // console.log(usuarios);

    // console.log(usuarios.splice(2, 1));

    // console.log(usuarios);

    // console.log('suma', sumaIds);

    // let cadenaDeTexto = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur nisi doloremque. Rerum corrupti sint architecto eius. Ipsa nesciunt animi sequi fuga blanditiis consectetur, ad, doloribus dignissimos quod ea aut!';

    // console.log(cadenaDeTexto.slice(0, 20));

    // console.log(cadenaDeTexto.includes('dolor'));

    // console.log(cadenaDeTexto.replace('dolor', 'Beto'));

    // console.log(cadenaDeTexto.toUpperCase());


    // console.log(cubos);
    addEvents();
    
    let boton = document.querySelector('#btnAdd');
    
    boton.addEventListener('click', function(event){
        const template = '<div class="cube"></div>';
        let contenedor = document.querySelector('.container');
        contenedor.innerHTML = contenedor.innerHTML + template; 
        addEvents();
    })
    
});

function addEvents(){
    const colores = ['rojo', 'azul', 'verde'];
    let cubos = document.querySelectorAll('.cube');
    cubos.forEach((cubo) => {
        cubo.addEventListener('click', function(event){
            let existeRojo = cubo.classList.contains(colores[0]);
            let existeAzul = cubo.classList.contains(colores[1]);
            let existeVerde = cubo.classList.contains(colores[2]);

            if (existeRojo) {
                cubo.classList.remove(colores[0]);
                cubo.classList.add(colores[1]);
            } else if (existeAzul) {
                cubo.classList.remove(colores[1]);
                cubo.classList.add(colores[2]);
            } else if (existeVerde) {
                cubo.classList.remove(colores[2]);
                cubo.classList.add(colores[0]);
            } else {
                cubo.classList.add(colores[0])
            }
        })
        
    })
}