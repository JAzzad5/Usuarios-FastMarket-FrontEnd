import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
declare const L: any;
declare const Swal: any;

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
  User= "61784e12a85334e2f36e9a95"
  subtotal:any=0;
  total:any=0;
  envio:any;
  lat:any="";
  lon:any="";
  direccion:any ="Res. Centroamerica"
  zoom:any = 15;
  mymap:any="";
  marker:any ="";
  ver:any ="carrito";
  tarjeta:any = 4567;


  ngOnInit(): void {
      this.obtenerUsuario();
      this.obtenerCarrito();
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
    
    verTarjeta(){
      this.ver ="tarjeta"
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

  sumaSubtotal(){
    let Empresas:any =[];
    this.CarritoUsuario.forEach((element:any) => {
        this.subtotal += element.Cantidad * element._id.Precio;
        //Condicionamiento para que sume los costos de envio de cada empresa, sin sumar costos repetidos de una misma empresa
        let empresaActual = element;
        let coincidencia =0;
        let nuevoEnvio=0;

        //ciclo para compara las empresas que han salido
        if (Empresas.length == 0 ){
          this.envio = empresaActual._id.Comercio[0].CostoEnvio;
        }
        coincidencia =0;
        Empresas.forEach((empresa:any) => {
          
          //console.log(empresaActual._id.Comercio[0].NombreComercio + " || " + empresa._id.Comercio[0].NombreComercio);
          if(empresaActual._id.Comercio[0].NombreComercio == empresa._id.Comercio[0].NombreComercio){
            coincidencia = 1
          }
          nuevoEnvio = empresaActual._id.Comercio[0].CostoEnvio
        });
        //si halla una coincidencia no agrega el costo de envio
        //console.log("coincidencia",coincidencia);
        if(coincidencia!=1){
          
          //console.log("costoAnterior" , this.envio);
          //console.log("se suma" , nuevoEnvio);

          this.envio += nuevoEnvio;
          //console.log("costo nuevo" , this.envio);
        }
        Empresas.push(element);
        
    });
    console.log("Subtotal", this.subtotal);
    this.total = this.subtotal + this.envio;
    console.log("Total",this.total);
  }

  sweet(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Orden enviada`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  cabiarTarjeta(){
    this.modalService.dismissAll();
  }

  obtenerCarrito(){
    this.usuarioService.obtenerCarritoUsuario(this.User).subscribe(
      res=>{
        console.log("Carrito", res[0].CarritoCompras);
        this.CarritoUsuario= res[0].CarritoCompras;
        this.ProductosCarrito= res[0].CarritoCompras.length;
        this.envio = (res[0].CarritoCompras[0]._id.Comercio[0].CostoEnvio);
        this.sumaSubtotal();
      }
    );
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuario(this.User).subscribe(
      res=>{
        console.log(res);
        this.NombreUsuario = res.NombreUsuario;
      },
      error=>{
        console.log(error);
      }
    );
  }
}
