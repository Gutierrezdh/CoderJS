/* Defino funciones que utilizaré para el calculo de precios */

function calcularDescuentos(precioneto, porcentaje){
    return (precioneto == 0 ? 0 : porcentaje == 0 ? 0 : precioneto * porcentaje / 100)    
}

function calcularIva(precioneto, descuento, alicuota){
    return (precioneto == 0 ? 0 : alicuota == 0 ? 0 : (precioneto - descuento) * alicuota / 100)    
}

/* Solicito al usuario confirmación para comenzar proceso de cotización*/
    let AgregaArticulo = prompt("Desea calcular el costo de un articulo? (Respuestas posibles; SI - NO)");

    if (AgregaArticulo.toLowerCase() === "si"){
        while(AgregaArticulo.toLowerCase() === "si"){
            let neto = prompt("Ingrese el precio neto del artículo (ARS)");
            let Porcdescuento = prompt("Si el articulo tiene algun descuento ingrese el porcentaje de descuento por favor.");
            let Porciva = prompt("Ingrese la alícuota de iva para el artículo que desea cotizar");
            let descuentos = calcularDescuentos(neto, Porcdescuento)
            let impuestos = calcularIva(neto, descuentos, Porciva);
            let total = neto - descuentos + impuestos;                
            let mensaje =`El precio es ARS ${total}`;
            alert(mensaje);
        AgregaArticulo = prompt("Desea calcular el precio de otro artículo? (Respuestas posibles; SI - NO)");
        }  
    }    
    else if (AgregaArticulo.toLowerCase() === "no"){
    let mensaje ="Gracias por usar nuestro calculador de precios";
    alert(mensaje);
    }
    else{
    let mensaje =`${AgregaArticulo.toUpperCase()} no es un valor válido`;
    alert(mensaje);    
    }
