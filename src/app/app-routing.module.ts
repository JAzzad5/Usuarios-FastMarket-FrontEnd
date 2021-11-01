import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ComerciosComponent } from './components/comercios/comercios.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductosComercioComponent } from './components/productos-comercio/productos-comercio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {path: 'inicioSesion', component: InicioSesionComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'categorias', component:CategoriasComponent},
  {path: 'comercios', component:ComerciosComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: '', component:LandingPageComponent},
  {path: ':categoria/comercios', component:ComerciosComponent},
  {path: ':categoria/comercios/:idComercio', component:ProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioSesionComponent, RegistroComponent, CategoriasComponent, ComerciosComponent,ProductosComponent,PerfilComponent, LandingPageComponent];
