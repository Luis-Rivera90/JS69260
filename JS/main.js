let opcion;
let tipoDeArticulo;
const listaDeArticulos=[];
const articulo=[];

function verListaDeArticulos(){
    if(listaDeArticulos.length===0){
        alert("No hay artículos en la lista");
    } else{
        alert(listaDeArticulos.join("\n"));
    }
};


function verArticulo(){
    if(articulo.length===0){
        alert("No hay artículos en la lista");
    } else{
        if (tipoDeArticulo= prompt("Ingrese un articulo"));
        articulo.filter(articulo=>articulo.tipo === tipoDeArticulo);
        alert(articulo.join("\n"));
    }
}


function crearArticulo(){
    const tipo= prompt("Ingrese el tipo de artículo.");
    const marca= prompt("Ingrese la marca del artículo.");
    const color= prompt("Ingrese el color del artículo.");
    const talle= prompt("Ingrese el talle del artículo.");
    const continuar= confirm("continuar?")

    if(continuar){
        articulo.push(tipo);
        articulo.push(marca);
        articulo.push(color);
        articulo.push(talle);

    }

    const agregarArticuloALaLista= listaDeArticulos.push(articulo);
    confirm ("Vas a agregar a la lista" + "\n\n" + articulo.join("\n") + "\n\n" + "Continuar?")
    alert("Artículo agregado correctamente.")

};



do {
    opcion= parseInt(prompt("Bienvenido!\n\n1. Para ver la lista de stock.\n2. Para filtrar por artículo.\n3. Para agregar un artículo a la lista\n\n Presione 0 para salir."));


    switch (opcion) {
        case 0:
            confirm("Seguro que desea salir?");
            break;

        case 1:
            verListaDeArticulos();
            break;

        case 2:
            verArticulo();
            break;

        case 3:
            crearArticulo();
            break;

        default:
            alert("Opción no válida");
            break;
    }
    
} while (opcion!==0);