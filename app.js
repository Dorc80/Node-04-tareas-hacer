require('colors');

const { mostrarListadoCheckList } = require('./helpers/guardarArchivo');
const { leerDB } = require('./helpers/guardarArchivo');
const { guardarDB, listadoTareasBorrar } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu, pausa, leerInput, confirmar } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = ''

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;
            case '6': //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log({ id });

                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?');

                    if (ok) {
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada');
                    }

                }

                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();

    } while (opt !== '0')

}

main();