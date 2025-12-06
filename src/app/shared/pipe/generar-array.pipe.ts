import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'generarArray' })
export class GenerarArrayPipe implements PipeTransform {

    transform(value) {
        return (new Array(value)).fill(1);
    }
}