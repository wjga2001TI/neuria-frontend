import { Pipe, PipeTransform } from '@angular/core';
import { PrecioFunction } from '@function/precio.function';
import { Precio } from '@model/precio.model';

@Pipe({ name: 'precioFull' })
export class PrecioFullPipe implements PipeTransform {

    transform(precio: Precio): number {
        return PrecioFunction.precioFull(precio);
    }
}
