import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ContenedorCategoriasComponent } from './components/contenedor-categorias/contenedor-categorias.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContenedorComerciosComponent } from './components/contenedor-comercios/contenedor-comercios.component';
import { ProductosComercioComponent } from './components/productos-comercio/productos-comercio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ComerciosComponent } from './components/comercios/comercios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { HistorialOrdenesComponent } from './components/historial-ordenes/historial-ordenes.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BuscarComponent,
    ContenedorCategoriasComponent,
    ContenedorComerciosComponent,
    ProductosComercioComponent,
    RegistroComponent,
    InicioSesionComponent,
    CategoriasComponent,
    ComerciosComponent,
    ProductosComponent,
    PerfilComponent,
    LandingPageComponent,
    UbicacionComponent,
    TarjetaComponent,
    HistorialOrdenesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
