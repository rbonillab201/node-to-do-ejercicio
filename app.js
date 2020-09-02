// Required
const fs = require('fs');
const colors = require('colors');
const nuevaTarea = require('./acciones/porHacer');

const descripcion = {
    demand: false,
    alias: 'd',
    desc: 'Describe la tarea a realizar'
};

const completado = {
    alias: 'c',
    default: false,
    desc: 'Define si la tarea se ha completado, inicia como false',
    type: 'boolean'
};

const argv = require('yargs')
    .command('listar', 'Listado de tareas por hacer', {
        descripcion
    })
    .command('crear', 'Crear una tarea', {
        descripcion,
        completado
    })
    .command('actualizar', 'Actualiza una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Opción para borrar un registro', {
        descripcion
    })
    .help()
    .argv;

const comando = argv._[0];



switch (comando) {
    case 'listar':
        listado = nuevaTarea.listar();
        for (let i of listado) {
            console.log('================='.green);
            console.log(i.descripcion);
            console.log(i.completado);
            console.log('================='.green);
        }
        console.log(`${listado}: Listado`);
        //      console.log(fs);
        break;
    case 'crear':
        console.log(`${comando}: Crea una tarea`);
        console.log(`${argv.descripcion}`);
        nuevaTarea.crear(argv.descripcion);
        break;
    case 'actualizar':
        /*       console.log("parametros enviados: ");
               console.log(`descripcion: ${argv.d}`);
               console.log(argv.completado);*/
        let actualizado = nuevaTarea.actualizar(argv.descripcion, argv.completado);
        /*    console.log(actualizado);*/
        console.log(`${comando}: Actualiza una tarea: boolean -> ${argv.completado}`);
        break;

    case 'borrar':

        let resultado = nuevaTarea.borrar(argv.descripcion);
        console.log(`${comando}: Borrar una tarea: boolean -> ${argv.descripcion} -> resultado: ${resultado}`);
        break;

    default:
        console.log(`No existe el comando '${comando}' `);
        break;
}

module.exports = {
    argv
};