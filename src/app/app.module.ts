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

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BuscarComponent,
    ContenedorCategoriasComponent,
    ContenedorComerciosComponent,
    ProductosComercioComponent,
    RegistroComponent,
    InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
