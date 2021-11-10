import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';

@Component({
  selector: 'app-historial-ordenes',
  templateUrl: './historial-ordenes.component.html',
  styleUrls: ['./historial-ordenes.component.css']
})
export class HistorialOrdenesComponent implements OnInit {

  constructor(private ordenesService:OrdenesService) { }
  ordenes:any;

  ngOnInit(): void {
    this.ordenesService.obtenerOrdenesUsuario('61784e12a85334e2f36e9a95').subscribe(
      res=>{
        console.log(res);
        this.ordenes = res;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
