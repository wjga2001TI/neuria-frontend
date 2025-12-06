import { Pipe, PipeTransform } from '@angular/core';
import { Moneda } from '@model/moneda.model';
import { formatCurrency } from '@function/format-currency.function';
import { convertCurrency } from '@function/convert-currency';

@Pipe({ name: 'amountConvert' })
export class AmountConvertPipe implements PipeTransform {

    transform(amount: number, exchangeRate: number): number
    {
        return convertCurrency(amount, exchangeRate);
    }
}
