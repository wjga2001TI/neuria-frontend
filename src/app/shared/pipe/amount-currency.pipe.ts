import { Pipe, PipeTransform } from '@angular/core';
import { Moneda } from '@model/moneda.model';
import { formatCurrency } from '@function/format-currency.function';

@Pipe({ name: 'amountCurrency' })
export class AmountCurrencyPipe implements PipeTransform {

    // Show any currency with no convert amount
    transform(amount: number, currency: Moneda): string
    {
        let simbolo = currency.simbolo;
        return formatCurrency(amount, 2, simbolo);
    }
}
