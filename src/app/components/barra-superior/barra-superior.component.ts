import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  faUser = faUser;
  faMapMarkerAlt = faMapMarkerAlt;
  faShoppingCart = faShoppingCart;
  
  constructor(private modalService:NgbModal, private usuarioService:UsuariosService) { }
  NombreUsuario:any;
  CarritoUsuario:any;
  ProductosCarrito:any;
  ngOnInit(): void {
    this.usuarioService.obtenerUsuario("61784e12a85334e2f36e9a95").subscribe(
      res=>{
        console.log(res);
        this.NombreUsuario = res.NombreUsuario;
        this.CarritoUsuario = res.CarritoCompras;
        this.ProductosCarrito = res.CarritoCompras.length;
        console.log("Carrito",this.CarritoUsuario);
      },
      error=>{
        console.log(error);
      }
    );
  }

  abrirCarrito(modal:any){
    this.modalService.open(
      modal,
      {
        size:'s',
        centered:true
      }
    );
  }
}
