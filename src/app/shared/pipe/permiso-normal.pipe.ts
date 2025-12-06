import { Pipe, PipeTransform } from '@angular/core';
import { AutenticacionService } from '@service/autenticacion.service';

@Pipe({ name: 'permisoNormal' })
export class PermisoNormalPipe implements PipeTransform {

    constructor(private authService: AutenticacionService) { }

    transform(role) {
        let usuarioRole: string[] = this.authService.getUsuario().roles;
        let stringRoles: string[] = Object.keys(usuarioRole).map(key => usuarioRole[key]);

        return stringRoles.some((roleString) => {
            return roleString == role;
        });
    }
}
