import { Pipe, PipeTransform } from '@angular/core';
import { Moneda } from '@model/moneda.model';
import { formatCurrency } from '@function/format-currency.function';
import { Dinero, toSnapshot } from 'dinero.js';

@Pipe({ name: 'showDinero' })
export class ShowDineroPipe implements PipeTransform {

    // Show any currency with no convert amount
    transform(dinero: Dinero<number>, currency: Moneda): string
    {
        let simbolo = currency.simbolo;
        let dineroData = toSnapshot(dinero);
        return formatCurrency(dineroData.amount, dineroData.scale, simbolo);
    }
}
