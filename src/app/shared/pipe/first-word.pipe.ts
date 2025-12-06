import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstWord' })
export class FirstWordPipe implements PipeTransform {

    transform(input: string): string {
        let info: string = input;
        let tmp = input.split(' ');
        if(tmp.length > 0) {
            info = tmp[0];
        }
        return info.trim();
    }
}
