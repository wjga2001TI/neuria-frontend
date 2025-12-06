import { Pipe, PipeTransform } from '@angular/core';
import { AutenticacionService } from '@service/autenticacion.service';

import { RoleZonaPrefix } from '@model/permiso.model';

@Pipe({ name: 'permisoZona' })
export class PermisoZonaPipe implements PipeTransform {

    constructor(
        private authService: AutenticacionService
        ) {
    }

    transform(zonaId) {

        let usuarioRole: string[] = this.authService.getUsuario().roles;
        let stringRoles: string[] = Object.keys(usuarioRole).map(key => usuarioRole[key]);
        let zonaRoleNombre = RoleZonaPrefix + zonaId;

        return stringRoles.some((roleString) => {
            return roleString == zonaRoleNombre;
        });
    }
}
