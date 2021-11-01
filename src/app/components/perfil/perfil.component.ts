import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor(private usuarioService:UsuariosService) { }

  Usuario:any= {};
  ngOnInit(): void {

    this.usuarioService.obtenerUsuario("61784e12a85334e2f36e9a95").subscribe(
      res=>{
        console.log(res);
        this.Usuario =res;
        console.log("Usuario",this.Usuario)
      },
      error=>{
        console.log(error);
      }
    );
  }

}
