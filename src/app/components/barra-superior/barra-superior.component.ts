import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart, faHistory } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
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
  faHistory = faHistory;
  
  constructor(private modalService:NgbModal, private ordenesService:OrdenesService, private usuarioService:UsuariosService,private cookieService:CookieService) { }
  NombreUsuario:any;
  CarritoUsuario:any;
  Usuario:any
  ProductosCarrito:any;
  User= this.cookieService.get('User');
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

  aggMarcador(lat:any, long:any, titulo:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup(`<b> ${titulo} </b>`).openPopup();
    this.lat = lat;
    this.lon = long;
  }

  confirmarUbicacion(){
    if(this.ProductosCarrito >0){
      this.ver ="ubicacion";
      this.verMapa();
    }
    else{
      this.alertaVacio();
    }
  }
  
  
    verCarrito(){
      this.ver ="carrito"
    }
    
    verTarjeta(){
      if(this.lat=="" && this.lon=="" ){
        this.alerta();
      }
      else{
        this.ver ="tarjeta"
      }
    }

  verMapa(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.lat = this.Usuario.Ubicacion.lat;
        this.lon = this.Usuario.Ubicacion.lon;
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

        this.aggMarcador(this.lat, this.lon, this.Usuario.Ubicacion.NombreUbicacion);
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

  alerta(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Debe a??adir una ubicaci??n`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  alertaT(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Debe a??adir Tarjeta`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  alertaVacio(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Debe a??adir Productos al Carrito`,
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
        if(res[0].CarritoCompras.length >0){
          this.envio = (res[0].CarritoCompras[0]._id.Comercio[0].CostoEnvio);
        }
        else{
          this.envio = 0
        }
        this.sumaSubtotal();
      }
    );
  }

  obtenerUsuario(){
    this.usuarioService.obtenerUsuario(this.User).subscribe(
      res=>{
        console.log(res);
        this.Usuario = res;
        this.NombreUsuario = res.NombreUsuario;
      },
      error=>{
        console.log(error);
      }
    );
  }

  finalizarOrden(){
    if(this.Usuario.Tarjeta.Numero != null){
      let formOrden = {
        usuario: this.Usuario._id,
      }
      this.ordenesService.a??adirOrden(formOrden).subscribe(
        res=>{
          console.log(res);
          console.log(formOrden);
          this.sweet();
          this.Usuario.CarritoCompras.forEach((element:any) => {
            console.log(element);
            this.ordenesService.a??adirProductosOrden(res[0]._id, element).subscribe(
              res=>{
                console.log(res);
              }
            );
          });
          this.usuarioService.a??adirAlHistorial(formOrden.usuario, res[0]._id).subscribe(
            res=>{
              console.log(res);
              this.usuarioService.limpiarCarrito(formOrden.usuario).subscribe(
                res=>{
                  console.log(res);
                }
              );;
              this.obtenerCarrito();
            }
          );
          
        }
      );
    }
    else{
      this.alertaT()
    }
  }
}
