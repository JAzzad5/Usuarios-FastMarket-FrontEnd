import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { faCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-historial-ordenes',
  templateUrl: './historial-ordenes.component.html',
  styleUrls: ['./historial-ordenes.component.css']
})
export class HistorialOrdenesComponent implements OnInit {

  constructor(private usuariosService:UsuariosService, private cookieService:CookieService) { }
  ordenes:any;
  User = this.cookieService.get('User');
  faCircle=faCircle;
  faArrowLeft=faArrowLeft;


  ngOnInit(): void {
    this.usuariosService.obtenerHistorialOrdenes(this.User).subscribe(
      res=>{
        console.log(res[0].HistorialOrdenes);
        this.ordenes = res[0].HistorialOrdenes;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
