import { Pipe, PipeTransform } from '@angular/core';
import { MonedaService } from '@service/moneda.service';
import { Moneda } from '@model/moneda.model';
import { formatCurrency } from '@function/format-currency.function';
import { convertCurrency } from '@function/convert-currency';

@Pipe({ name: 'systemCurrencyTo' })
export class SystemCurrencyToPipe implements PipeTransform {

    systemCurrency: Moneda = null;

    constructor(private monedaService: MonedaService) {
        this.systemCurrency = this.monedaService.getMonedaSistema();
    }

    // Show amount in USD to currency selected
    transform(amount: number, currency: Moneda): string
    {
        let symbol = this.systemCurrency.simbolo;
        let exchangeRate = this.systemCurrency.tasa;
        if(currency && currency.id != this.systemCurrency.id)
        {
            symbol = currency.simbolo;
            amount = convertCurrency(amount, exchangeRate);
        }
        return formatCurrency(amount, 2, symbol);
    }
}
