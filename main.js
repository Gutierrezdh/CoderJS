

/* Variables 
Funciones
Objetos
Arrays
Metodos de busqueda y filtrado en Arrays 
Uso de Prompt
Uso de Alert o Console.log()
*/
/* Objeto - > Usuario
Array - > Usuarios
funciones - > Busqueda y filtrado de usuario / contraseña
Prompt - > Usuario / Contraseña
Alert / Console Log -> Resultado del filtrado
 */

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
    console.log(existenciaUsuario[0]);

/* Genero funcion para validar la contraseña del usuario */

    function ValidarClaveUsuario() {
        if (existenciaUsuario.length > 0) {
            const ValidacionClave = existenciaUsuario.filter((el) => el.contraseña === clave);
            if (ValidacionClave.length > 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }   

const claveValida = ValidarClaveUsuario(usuario);


/* Mensaje de validacion al usuario segun el resultado de las funciones */

let bienvenida = `Bienvenido ${existenciaUsuario[0].nombre} ${existenciaUsuario[0].apellido}`;
let errorValidacion = "Usuario o contraseña incorrectos"

if (existenciaUsuario.length > 0) {
    if(claveValida == 1) {
        alert(bienvenida)
    } 
    else {
        alert(errorValidacion);  
    }
} 
else {
    alert(errorValidacion);
}

