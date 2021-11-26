import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { faCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-historial-ordenes',
  templateUrl: './historial-ordenes.component.html',
  styleUrls: ['./historial-ordenes.component.css']
})
export class HistorialOrdenesComponent implements OnInit {

  constructor(private usuariosService:UsuariosService) { }
  ordenes:any;
  User = '61784e12a85334e2f36e9a95';
  faCircle=faCircle;
  faArrowLeft=faArrowLeft;


  ngOnInit(): void {
    this.usuariosService.obtenerHistorialOrdenes(this.User).subscribe(
      res=>{
        console.log(res[0].HistorialOrdenes);
        this.ordenes = res[0].HistorialOrdenes;
        console.log('productos',res[0].HistorialOrdenes[0].productos[0]._id[0].NombreProducto)
      },
      error=>{
        console.log(error);
      }
    );
  }

}
