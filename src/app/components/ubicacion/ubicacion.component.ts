import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const L: any;
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  lat:any="";
  lon:any="";
  direccion:any ="Res. Centroamerica"
  zoom:any = 15;
  mymap:any="";
  marker:any ="";
  constructor() { }

  ngOnInit(): void {


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

          this.mymap.on('click', this.onMapClick.bind(this));
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }

  }

  onMapClick(ev:any) {
    let cambiarUbicación = confirm("Desea cambiar la ubicacion a las siguientes coordenadas coordenadas " + ev.latlng + "?");
    if(cambiarUbicación){
      this.mymap.removeLayer(this.marker)
      this.aggMarcador(ev.latlng.lat, ev.latlng.lng);
    }
  }

  aggMarcador(lat:any, long:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup("<b>Ubicación Actual </b>").openPopup();
    this.lat = lat;
    this.lon = long;
  }

}
