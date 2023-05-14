/* Cargo datos inciales de usuario dados de alta en la DB */

const usuarios = [
    { usuario: 'Daniel', contraseña: '123asD', nombre: 'Daniel', apellido: 'Gutiérrez'},
    { usuario: 'Carlos', contraseña: '456bcC', nombre: 'Carlos', apellido: 'Velazquez'},
    { usuario: 'Victoria', contraseña: '789asD', nombre: 'Victoria', apellido: 'Pérez'},
    { usuario: 'Romina', contraseña: '654bcC', nombre: 'Romina', apellido: 'Rodriguez'}
]

/* Solicito credenciales al usuario */
let usuario = prompt("Ingrese su usuario");
usuario = usuario.toLowerCase();
let clave = prompt("Ingrese su contraseña");

/* Genero funcion para validar el nombre de usuario */

    function ValidarExistenciaUsuario (nombreUsuario){
        return usuarios.filter((el) => el.usuario.toLowerCase() === nombreUsuario);
    }
    const existenciaUsuario = ValidarExistenciaUsuario(usuario);


/* Genero funcion para validar la contraseña del usuario */

    function validarClaveUsuario() {
            const ValidacionClave = existenciaUsuario.filter((el) => el.contraseña === clave);
            if (ValidacionClave.length > 0) {
                return 1;
            }
            else {
                return 0;
            }
    }

    /* Valido contraseña del usuario */

    let claveValida;
    if (existenciaUsuario.length === 0) {
        claveValida = 0
    }
    else claveValida = validarClaveUsuario();

/* Mensaje de validacion al usuario segun el resultado de las funciones */

    if(claveValida == 1) {
        let bienvenida = `Bienvenido ${existenciaUsuario[0].nombre} ${existenciaUsuario[0].apellido}`;
        alert(bienvenida);
    } 
    else {
        let errorValidacion = "Usuario o contraseña incorrectos"
        alert(errorValidacion);
    }

