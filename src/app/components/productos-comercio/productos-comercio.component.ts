import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ComerciosService } from 'src/app/services/comercios.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-comercio',
  templateUrl: './productos-comercio.component.html',
  styleUrls: ['./productos-comercio.component.css']
})
export class ProductosComercioComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor(private productosService:ProductosService, private comerciosService:ComerciosService) { }

  productos:any=[];
  categoriaURL:any;
  nombreComercio:any ="";
  Banner:any ="";
  idURL:any;
  url: any = new URL(window.location.href);

  ngOnInit(): void {   
    this.categoriaURL= (this.url.pathname.split('/'))[1];
    this.idURL = (this.url.pathname.split('/'))[3];

    this.productosService.obteneProductos(this.categoriaURL, this.idURL).subscribe(
      res=>{
        this.productos = res;
        console.log(res);
      },
      error=>{
        console.log(error);
      }
    );

    this.comerciosService.obtenerUnComercio(this.categoriaURL, this.idURL).subscribe(
      res=>{
        let resultado = res;
        this.nombreComercio = resultado.Comercios[0].NombreComercio;
        this.Banner = resultado.Comercios[0].BannerComercio;
      },
      error=>{
        console.log(error);
      }
    )

  }

}
