import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ComerciosService } from 'src/app/services/comercios.service';
import { ProductosService } from 'src/app/services/productos.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare const Swal: any;

@Component({
  selector: 'app-productos-comercio',
  templateUrl: './productos-comercio.component.html',
  styleUrls: ['./productos-comercio.component.css']
})
export class ProductosComercioComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor(private productosService:ProductosService, private comerciosService:ComerciosService, private usuariosService:UsuariosService, private modalService: NgbModal) { }

  productos:any=[];
  categoriaURL:any;
  nombreComercio:any ="";
  Banner:any ="";
  idURL:any;
  AggProducto:any = {};
  cantidad:any =1;
  subtCarrito:any;
  User = "61784e12a85334e2f36e9a95";
  url: any = new URL(window.location.href);

  ngOnInit(): void {   
    this.categoriaURL= (this.url.pathname.split('/'))[1];
    this.idURL = (this.url.pathname.split('/'))[3];

    this.productosService.obteneProductos(this.idURL).subscribe(
      res=>{
        this.productos = res.Productos;
        console.log(res);
      },
      error=>{
        console.log(error);
      }
    );

    this.comerciosService.obtenerUnComercio(this.idURL).subscribe(
      res=>{

        console.log(res)
        this.nombreComercio = res.NombreComercio;
        this.Banner = res.BannerComercio;
      },
      error=>{
        console.log(error);
      }
    )

  }

  open(content:any, id:any) {
    console.log(id);
    this.productosService.obtenerUnProducto(id).subscribe(
      res=>{
        console.log(res);
        this.AggProducto = res;
      },
      error=>{
        console.log(error);
      }
    );
    this.modalService.open(
      content,
      {
        size:'m',
        centered:true
      }
      );
  }

  agregarAlCarrito(){
    console.log(this.cantidad);
    console.log(this.AggProducto._id);
    let formAñadir = {
      _id: this.AggProducto._id,
      Cantidad: this.cantidad
    }
    this.usuariosService.añadirAlCarrito(this.User, formAñadir).subscribe(
      res=>{
        console.log(res);
        this.sweet();
      }
    );
  }

  sweet(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Producto añadido al carrito`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

}
