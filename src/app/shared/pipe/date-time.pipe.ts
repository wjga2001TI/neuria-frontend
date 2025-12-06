import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateTime' })
export class DateTimePipe implements PipeTransform {
    transform(input: string): string {

        let parts: string[] = input.split(' ');
        let date: string = parts[0];
        let time: string = parts[1];
        parts = date.split('-');
        return parts[2]+'-'+parts[1]+'-'+parts[0]+' '+time;
    }
}