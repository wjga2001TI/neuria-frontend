import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateOnly' })
export class DateOnlyPipe implements PipeTransform {
    transform(input: string): string {

        let parts: string[] = input.split(' ');
        let date: string = parts[0];
        parts = date.split('-');
        return parts[2]+'-'+parts[1]+'-'+parts[0];
    }
}