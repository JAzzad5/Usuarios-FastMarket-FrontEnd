import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
declare const L: any;

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
  lat:any="";
  lon:any="";
  direccion:any ="Res. Centroamerica"
  zoom:any = 15;
  mymap:any="";
  marker:any ="";
  ver:any ="carrito";
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

  aggMarcador(lat:any, long:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup("<b>Ubicación Actual </b>").openPopup();
    this.lat = lat;
    this.lon = long;
  }

  confirmarUbicacion(){
    this.ver ="ubicacion";
    this.verMapa();
  }

  verCarrito(){
    this.ver ="carrito"
  }

  verMapa(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log(position);
        
        console.log(this.lat);
        console.log(this.lon);

        this.mymap = L.map('mapa').setView([this.lat, this.lon], this.zoom);
          L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.leafletToken}`, {
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: environment.leafletToken
        }).addTo(this.mymap);

        this.aggMarcador(this.lat, this.lon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
