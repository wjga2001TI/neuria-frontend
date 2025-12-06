import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelcase' })
export class CamelCasePipe implements PipeTransform {

    transform(input: string): string {
        let tmp = input.split(' ');
        let info: string = '';
        for (let i = 0; i < tmp.length; i++) {
            info += (tmp[i].charAt(0).toUpperCase() + tmp[i].slice(1).toLowerCase() + ' ');
        } 
        return info.trim();
    }
}
