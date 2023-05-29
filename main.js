// Busco botones del carrito
const btnCarrito = document.getElementById('verCarrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');

/* Operaciones del carrito */
// Defino una funcion para evaluar si el carrito tiene algo dentro (incluí una evaluación especifica para determinar si lo que tiene dentro, es distinto de una key propia del LiveServer)
const validarActivacionCarrito = () => {
    const claves = Object.keys(sessionStorage);
    const clavesValidas = claves.some(key => key !== "IsThisFirstTime_Log_From_LiveServer");
    return sessionStorage.length > 0 && clavesValidas;
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

/* Vaciar carrito */
btnVaciarCarrito.addEventListener('click', () => {
    sessionStorage.clear();
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
// Creo los articulos
const amarillo = new articulo(1, "Amor amarillo", 1993, 4900, "./img/amoramarillo.jpg");
const bocanada = new articulo(2, "Bocanada", 1999, 4900, "./img/bocanada.jpg");
const seshoy = new articulo(3, "Siempre es hoy", 2002, 5000, "./img/siempreeshoy.jpg");
const ahivamos = new articulo(4, "Ahí vamos", 2006, 5400, "./img/ahivamos.jpg");
const fnatural = new articulo(5, "Fuerza Natural", 2009, 5400, "./img/fuerzanatural.jpg");

// Creo un array de los artículos que seran visibles en el sitio
const articulos = [amarillo, bocanada, seshoy, ahivamos, fnatural];

// Busco el div contenedor, por su clase "container"
const containerHTML = document.getElementsByClassName('container')[0];

// Insertar un div por cada objeto en el array
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
    sessionStorage.setItem(`carrito-${articulo.id}`, JSON.stringify(articulo));
    validarActivacionCarrito();
    actualizarEstadoBotonCarrito(); 
    console.log(sessionStorage);
    console.log('Artículo agregado al carrito:', articulo);
    console.log(sessionStorage)
    });

/* Agrego comportamiento para boton "Quitar del carrito" */    
    const quitarCarritoBtn = tarjeta.getElementsByClassName('quitar-carrito')[0];
    quitarCarritoBtn.addEventListener('click', () => {
    sessionStorage.removeItem(`carrito-${articulo.id}`);
    validarActivacionCarrito();
    actualizarEstadoBotonCarrito(); 
    console.log(sessionStorage);
    console.log('Artículo eliminado del carrito:', articulo);
    });
});
}
contrucTarjetas();

