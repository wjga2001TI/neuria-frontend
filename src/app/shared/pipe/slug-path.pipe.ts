import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaService } from '@service/categoria.service';


@Pipe({ name: 'slugPath' })
export class SlugPathPipe implements PipeTransform {

    constructor(
        private categoriaService: CategoriaService
        ) {
    }

    transform(input: string): string {
        let path = this.categoriaService.getSlugPath(input);
        if(path) {
            return path;
        }
        return '';
    }
}
