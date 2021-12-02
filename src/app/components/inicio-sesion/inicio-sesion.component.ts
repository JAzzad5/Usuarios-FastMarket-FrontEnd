import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CookieService } from 'ngx-cookie-service';
declare const Swal: any;
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  formularioLogin = new FormGroup({
    Correo:new FormControl('', [Validators.required]),
    Contraseña:new FormControl(''),
  });
  constructor(private usuariosService:UsuariosService, private cookieService: CookieService ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    console.log(this.formularioLogin.value);
    this.usuariosService.login(this.formularioLogin.value.Correo).subscribe(
      res=>{
        console.log(res);
        if(res==null){
          this.noExiste();
        }
        else{
          let pass = res.Contraseña;
          if(pass == this.formularioLogin.value.Contraseña){
            this.cookieService.set('User', res._id, { expires: 10});
            window.location.href = '/categorias';
          }
          else{
            this.incorrecto();
          }
        }
        
      },
      error=>{
        console.log(error);
      }
    );
  }

  
  correcto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Iniciar Sesión`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  
  incorrecto(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Correo y contraseña no coinciden.`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
  
  noExiste(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `El Correo no está registrado`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
}
