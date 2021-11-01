import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faStar, faClock, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { ComerciosService } from 'src/app/services/comercios.service';

@Component({
  selector: 'app-contenedor-comercios',
  templateUrl: './contenedor-comercios.component.html',
  styleUrls: ['./contenedor-comercios.component.css']
})
export class ContenedorComerciosComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faStar=faStar;
  faClock=faClock;
  faMoneyBillAlt=faMoneyBillAlt;
  constructor(private comerciosService:ComerciosService) { }

  comercios:any=[];
  categoriaURL:any;
  path: any = window.location.pathname;
  ngOnInit(): void {
    const url = new URL(window.location.href);
    this.categoriaURL= (url.pathname.split('/'))[1];
    //console.log(categoria)

    this.comerciosService.obtenerComercios(this.categoriaURL).subscribe(
      res=>{
        console.log(res);
        this.comercios=res[0].Comercios
        console.log(this.comercios);
      },
      error=>{

      }
    );
  }

}
