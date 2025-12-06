import { Pipe, PipeTransform } from '@angular/core';
import { formatAmount } from '../function/format-amount.function';

@Pipe({ name: 'formatAmount' })
export class FormatAmountPipe implements PipeTransform {

    transform(amount: number, decimals: number = 2): string
    {
        return formatAmount(amount, decimals);
    }
}
