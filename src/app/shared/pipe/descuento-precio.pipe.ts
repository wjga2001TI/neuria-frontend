import { Pipe, PipeTransform } from '@angular/core';
import { PrecioFunction } from '@function/precio.function';
import { Precio } from '@model/precio.model';
//import { NumToFixed } from '@function/num-to-fixed.function';

@Pipe({ name: 'descuentoPrecio' })
export class DescuentoPrecioPipe implements PipeTransform {

    transform(precio: Precio): number
    {
    	//NumToFixed.num(monto, 0).toFixed(0)
        return parseFloat(PrecioFunction.ofertaPorciento(precio).toFixed(0));
    }
}
