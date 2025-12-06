import { Pipe, PipeTransform } from '@angular/core';
import { Ruta } from '@static/ruta';

@Pipe({
    name: 'getLink'
})
export class GetLinkPipe implements PipeTransform {

    rutas = Ruta;

    transform(ruta, objeto: {[key: string]: string | number} = {}): string {
        return this.get(ruta, objeto);
    }

    private get(ruta, params: {[key: string]: string | number} = {})
    {
        if(ruta) {
            if(this.rutas[ruta]) {
                return this.reemplazar(this.rutas[ruta], params);
            }
            else {
                throw new Error(`Ruta "${ruta}" no existe`);
            }
        }
        else {
            throw new Error(`No definio el nombre de la ruta`);
        }
    }

    private reemplazar(ruta, objeto) {
        const llaves = Object.keys(objeto);
        let contador = 0;
        let valor;
        for (let i = 0; i < llaves.length; i++) {
            valor = ':' + llaves[i];
            if(ruta.indexOf(valor) !== -1) {
                ruta = ruta.replace(valor, String(objeto[llaves[i]]));
            }
            else {
                throw new Error(`El parametro "${valor}" no ha sido indicado`);
            }
        }
        return String(ruta);
    }







}
