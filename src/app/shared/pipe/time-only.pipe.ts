import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeOnly' })
export class TimeOnlyPipe implements PipeTransform {
    transform(input: string): string
    {
        let parts: string[] = input.split(' ');
        return parts[1];
    }
}