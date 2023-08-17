const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(id => {
            listado.push(this._listado[id]);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }

    borrarTareas( id = '') {

        if(this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea);
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${(idx + '.').green} ${desc} :: ${estado}`);

        });

    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;

            if (completadas) {

                if (completadoEn) {
                    contador++
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }

            } else {

                if (!completadoEn) {
                    contador++
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }

            }

        });

    }

    toogleCompletadas ( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];

            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)) {
                tarea.completadoEn = null;
            }

        });

    }

}

module.exports = Tareas;