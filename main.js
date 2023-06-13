// Busco botones del carrito
const btnCarrito = document.getElementById('verCarrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');

/* Operaciones del carrito */
// Defino una funcion para evaluar si el carrito tiene algo dentro (incluí una evaluación especifica para determinar si lo que tiene dentro, es distinto de una key propia del LiveServer)
const validarActivacionCarrito = () => {
    const claves = Object.keys(localStorage);
    const clavesValidas = claves.some(key => key !== "IsThisFirstTime_Log_From_LiveServer");
    return localStorage.length > 0 && clavesValidas;
};

// Defino una funcion para que modifique el boton "Ver carrito", segun el estado obtenido con la funcion validarActivacionCarrito()
function actualizarEstadoBotonCarrito() {
    if (validarActivacionCarrito()) {
    btnCarrito.classList.add('active');
    btnCarrito.classList.remove('inactive');
    btnVaciarCarrito.classList.add('active');
    btnVaciarCarrito.classList.remove('inactive');
    } 
    else {
    btnCarrito.classList.add('inactive');
    btnCarrito.classList.remove('active');
    btnVaciarCarrito.classList.add('inactive');
    btnVaciarCarrito.classList.remove('active');
    }
}
validarActivacionCarrito();
actualizarEstadoBotonCarrito();

/* Asigno accion al boton "Vaciar carrito" */
btnVaciarCarrito.addEventListener('click', () => {
    localStorage.clear();
    console.log('Carrito vaciado');
    validarActivacionCarrito();
    actualizarEstadoBotonCarrito();
});

// Genero constructor de artículos
class articulo {
    constructor(id, nombre, año, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.año = año;   
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
    }
}

/* Genero el stock de productos que debe ser visible en el sitio */
// Obtengo los datos de los artículos del archivo JSON - Antes se seteaban directamente en el codigo de JS
fetch("./articulos.json")
    .then(response => response.json()) 
    .then(data => { // Construyo los articulos utilizando la funcion constructora y el JSON
    const amarillo = new articulo(
    data.amarillo.id,
    data.amarillo.nombre,
    data.amarillo.anio,
    data.amarillo.precio,
    data.amarillo.imagen
    );

    const bocanada = new articulo(
    data.bocanada.id,
    data.bocanada.nombre,
    data.bocanada.anio,
    data.bocanada.precio,
    data.bocanada.imagen
    );

    const seshoy = new articulo(
    data.seshoy.id,
    data.seshoy.nombre,
    data.seshoy.anio,
    data.seshoy.precio,
    data.seshoy.imagen
    );

    const ahivamos = new articulo(
    data.ahivamos.id,
    data.ahivamos.nombre,
    data.ahivamos.anio,
    data.ahivamos.precio,
    data.ahivamos.imagen
    );

    const fnatural = new articulo(
    data.fnatural.id,
    data.fnatural.nombre,
    data.fnatural.anio,
    data.fnatural.precio,
    data.fnatural.imagen
    );

// Creo un array de los artículos que seran visibles en el sitio
const articulos = [amarillo, bocanada, seshoy, ahivamos, fnatural];

// Busco el div contenedor, por su clase "container"
const containerHTML = document.getElementsByClassName('container')[0];

// Inserto un div por cada objeto en el array de articulos
const contrucTarjetas = () => {
articulos.forEach(articulo => {
  // Creo el nuevo div
    const tarjeta = document.createElement('div');
    tarjeta.innerHTML = `
    <div class="col-md-6 col-lg-4 col-xl-3">
            <div id="product-1" class="single-product">
            <div class="part-1 tarjeta_individual" style="background-image: url('${articulo.img}'); background-size: cover; background-position: center ; background-repeat: no-repeat; transition: all 0.3s"></div>
                    <div class="part-2">
                            <h3 class="product-title">${articulo.nombre}</h3>
                            <h4 class="product-old-price">${articulo.precio + 199}</h4>
                            <h4 class="product-price">${articulo.precio} ARS</h4>
                            <button class="agregar-carrito">Agregar al carrito</button>
                            <button class="quitar-carrito">Quitar del carrito</button>
                    </div>
            </div>
    </div>`;
    // Agrego el nuevo div al contenedor
    containerHTML.appendChild(tarjeta);

/* Agrego comportamiento para boton "Agregar al carrito" */
const agregarCarritoBtn = tarjeta.getElementsByClassName('agregar-carrito')[0];
    agregarCarritoBtn.addEventListener('click', () => {
        const carritoItemID = `carrito-${articulo.id}`;
        const carritoItem = localStorage.getItem(carritoItemID);
        /* Si el item ya existe en el carrito solo le incremento la cantidad en 1, si no existe lo inserto en el localStorage */
        if (carritoItem) {
        const carritoItemData = JSON.parse(carritoItem);
        carritoItemData.cantidad += 1;
        localStorage.setItem(carritoItemID, JSON.stringify(carritoItemData));
        } 
        else {
        localStorage.setItem(carritoItemID, JSON.stringify(articulo));
        }
    validarActivacionCarrito();
    actualizarEstadoBotonCarrito(); 
    console.log('Artículo agregado al carrito:', articulo);
    /* console.log(localStorage);  */
    });

/* Agrego comportamiento para boton "Quitar del carrito" */    
    const quitarCarritoBtn = tarjeta.getElementsByClassName('quitar-carrito')[0];
    quitarCarritoBtn.addEventListener('click', () => {
    localStorage.removeItem(`carrito-${articulo.id}`);
    validarActivacionCarrito();
    actualizarEstadoBotonCarrito(); 
    console.log(localStorage);
    console.log('Artículo eliminado del carrito:', articulo);
    });
});
}
contrucTarjetas();

const popUpContenedorArticulos = document.querySelector('#popUp article');
const mostrarArticulosCarrito = () => {
    popUpContenedorArticulos.innerHTML = '';
    Object.keys(localStorage).forEach((key) => {
        /* Valido que la clave sea distinta a la que se loguea en liveserver */
        if (key !== 'IsThisFirstTime_Log_From_LiveServer') {
            const carritoItem = JSON.parse(localStorage.getItem(key));
            const tarjetaArticulo = document.createElement('div');
            tarjetaArticulo.classList.add('carrito-item');
            tarjetaArticulo.innerHTML = `
                <h3>${carritoItem.nombre}</h3>
                <img src="${carritoItem.img}" alt="${carritoItem.nombre}" />
                <p>Precio: ${carritoItem.precio} ARS</p>
                <p>Cantidad: ${carritoItem.cantidad}</p>
                <button class="eliminar-articulo">Eliminar del carrito</button>
            `;
            popUpContenedorArticulos.appendChild(tarjetaArticulo);

            // Agrego boton para eliminar articulos de forma individual desde el pop up "Ver carrito"
            const eliminarArticuloBtn = tarjetaArticulo.querySelector('.eliminar-articulo');
            eliminarArticuloBtn.addEventListener('click', () => {
                localStorage.removeItem(key);
                mostrarArticulosCarrito();
                actualizarEstadoBotonCarrito();
            });
        }
    });
};
/* Agrego acción para el boton "Ver carrito" */
btnCarrito.addEventListener('click', mostrarArticulosCarrito);
})

/* catch del error cuando se busca el archivo JSON con los articulos */
.catch(error => {
console.error('Ha ocurrido el siguiente error al intentar acceder al archivo JSON:', error);
});








