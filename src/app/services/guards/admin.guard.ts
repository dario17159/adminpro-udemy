import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
// tslint:disable-next-line: variable-name
  constructor(private _usuarioService: UsuarioService){
    
  }
  
  canActivate(){

    if(this._usuarioService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }
    this._usuarioService.logOut();
    return false;
  }
  
}
