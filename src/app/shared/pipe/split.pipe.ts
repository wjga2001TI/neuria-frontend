import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})
export class SplitPipe implements PipeTransform
{
    transform(val: string, separator: string, get: number = null): string[]
    {
        return get === null ? val.split(separator) : [val.split(separator)[get]];
    }
}