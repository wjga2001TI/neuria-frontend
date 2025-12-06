import { Pipe, PipeTransform } from '@angular/core';
import { PrecioAlgoliaFunction } from '@function/precio-algolia.function';
import { AlgoliaDisponibilidad } from '@model/algolia.model';

type Funciones = 'precioFull' | 'ofertaFull' | 'precioUsar' | 'ofertaPorciento' | 'baseOrFull' | 'descuentoPrecio';

@Pipe({ name: 'precioAlgolia' })
export class PrecioAlgoliaPipe implements PipeTransform {

    transform(disponibilidad: AlgoliaDisponibilidad, tarea: Funciones): number
    {
        if (tarea === 'descuentoPrecio') {
            return parseFloat(PrecioAlgoliaFunction.ofertaPorciento(disponibilidad).toFixed(0));
        }

        if (tarea === 'precioFull') {
            return PrecioAlgoliaFunction.precioFull(disponibilidad);
        }

        if (tarea === 'ofertaFull') {
            return PrecioAlgoliaFunction.ofertaFull(disponibilidad);
        }

        if (tarea === 'precioUsar') {
            return PrecioAlgoliaFunction.precioUsar(disponibilidad);
        }

        if (tarea === 'ofertaPorciento') {
            return PrecioAlgoliaFunction.ofertaPorciento(disponibilidad);
        }

        if (tarea === 'baseOrFull') {
            return PrecioAlgoliaFunction.baseOrFull(disponibilidad);
        }

        // if (tarea === 'impuesto') {
        //     return PrecioAlgoliaFunction.impuesto(disponibilidad);
        // }


    }
}
