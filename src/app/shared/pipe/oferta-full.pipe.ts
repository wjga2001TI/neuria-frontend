import { Pipe, PipeTransform } from '@angular/core';
import { PrecioFunction } from '@function/precio.function';
import { Precio } from '@model/precio.model';

@Pipe({ name: 'ofertaFull' })
export class OfertaFullPipe implements PipeTransform {

    transform(precio: Precio): number {
        return PrecioFunction.ofertaFull(precio);
    }
}
