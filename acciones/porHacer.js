const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //cargarDB();
    let dato = JSON.stringify(listadoPorHacer);
    fs.writeFile('./DB/archivo.json', dato, error => {
        if (error) throw new Error('No se pudo escribir el archivo', error);
    });
};

const listar = () => {

    let listado = require('../DB/archivo.json');
    console.log(listado);
    return listado;
};

const cargarDB = () => {

    try {
        listadoPorHacer = require('../DB/archivo.json');
    } catch (error) {
        listadoPorHacer = [];
    }

    /*
    let dato = fs.readFile('./DB/archivo.json', (error, data) => {
        if (error) throw new Error('No se pudo cargar el archivo', error);
        let almacenado = JSON.parse(data);
        console.log(almacenado);
    });*/
};

const crear = (descripcion) => {

    let nuevaTarea = {
        descripcion,
        completado: false
    };
    cargarDB();
    //   console.log("----X---");
    //   console.log(listadoPorHacer);
    listadoPorHacer.push(nuevaTarea);
    //  console.log("----*---");
    //  console.log(nuevaTarea);
    guardarDB();
    return nuevaTarea;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(dato => dato.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();

    let nuevaLista = listadoPorHacer.filter(dato => dato.descripcion !== descripcion);

    if (nuevaLista.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevaLista;
        guardarDB();
        return true;
    }

    /* Esta es una opcion
    let index = listadoPorHacer.findIndex(dato => dato.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    } */
};

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
};