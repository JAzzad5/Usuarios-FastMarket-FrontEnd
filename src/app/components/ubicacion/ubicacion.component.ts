import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
declare const Swal: any;
declare const L: any;
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  zoom:any = 15;
  mymap:any="";
  marker:any ="";
  Usuario:any={};
  btnEditar = true;
  cambiarUbicacion = true;
  User=this.cookieService.get('User');

  formularioUbicacion = new FormGroup({
    NombreUbicacion:new FormControl('', [Validators.required, Validators.maxLength(40)]),
    lat:new FormControl('', [Validators.required]),
    lon:new FormControl('', [Validators.required])
  });

  constructor(private usuariosService:UsuariosService, private cookieService:CookieService) { }

  ngOnInit(): void {
      this.cargarUsuario();
      setTimeout(()=> this.verificarCambios(), 3000);
  }

  onMapClick(ev:any) {

    Swal.fire({
      title: 'Desea establecer nuevo punto de ubicación?',
      text: "para confirmar los cambios debes dar click en 'Editar Ubicación'",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar'
    }).then((result:any) => {
      
      if (result.isConfirmed) {
        this.cambiarUbicacion = true;
      }
      else{
        this.cambiarUbicacion=false;
      }

      console.log(this.cambiarUbicacion);
      if(this.cambiarUbicacion){
        this.mymap.removeLayer(this.marker)
        this.aggMarcador(ev.latlng.lat, ev.latlng.lng, "nueva ubicacion");
        this.formularioUbicacion.setValue({
          NombreUbicacion: this.Usuario.Ubicacion.NombreUbicacion,
          lat: ev.latlng.lat,
          lon: ev.latlng.lng
        });
        this.btnEditar = false;
      }
    })

  }

  aggMarcador(lat:any, long:any, msj:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup(`<b> ${msj} </b>`).openPopup();
    this.formularioUbicacion.value.lat = lat;
    this.formularioUbicacion.value.lon = long;
  }
  cargarMapa(){
    
    if(this.Usuario.Ubicacion.lat != "" && this.Usuario.Ubicacion.lon != "" ){
      this.mymap = L.map('mapa').setView([this.formularioUbicacion.value.lat, this.formularioUbicacion.value.lon], this.zoom);
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.leafletToken}`, {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: environment.leafletToken
          }).addTo(this.mymap);
  
          this.aggMarcador(this.formularioUbicacion.value.lat, this.formularioUbicacion.value.lon, "Mi ubicacion");
  
          this.mymap.on('click', this.onMapClick.bind(this));
    }
    else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.formularioUbicacion.value.lat = position.coords.latitude;
          this.formularioUbicacion.value.lon = position.coords.longitude;
          console.log(position);
          
          console.log(this.formularioUbicacion.value.lat);
          console.log(this.formularioUbicacion.value.lon);
  
          this.mymap = L.map('mapa').setView([this.formularioUbicacion.value.lat, this.formularioUbicacion.value.lon], this.zoom);
            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.leafletToken}`, {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: environment.leafletToken
          }).addTo(this.mymap);
  
          this.aggMarcador(this.formularioUbicacion.value.lat, this.formularioUbicacion.value.lon, "Ubicacion del GPS");
  
          this.mymap.on('click', this.onMapClick.bind(this));
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  
    }
    
  }

  cargarUsuario(){
    this.usuariosService.obtenerUsuario(this.User).subscribe(
      res=>{
        this.Usuario =res;
        console.log("Usuario",this.Usuario);
        this.cargarDatos();
        this.cargarMapa();
        
      },
      error=>{
        console.log(error);
      }
    );
  }

  cargarDatos(){
    console.log(this.Usuario)
    this.formularioUbicacion.setValue({
      NombreUbicacion: this.Usuario.Ubicacion.NombreUbicacion,
      lat: this.Usuario.Ubicacion.lat,
      lon: this.Usuario.Ubicacion.lon
    });
  }

  verificarCambios(){
    this.formularioUbicacion.valueChanges.subscribe(x => {
      this.btnEditar = false;
    })
  }

  editarUbicacion(){
    this.usuariosService.editarUbicacion(this.User, this.formularioUbicacion.value).subscribe(
      res=>{
        console.log(res);
        this.correcto();
      }
    );
  }
  
  correcto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Ubicacion Editada`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  sinCambios(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Sin datos modificados`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

}
