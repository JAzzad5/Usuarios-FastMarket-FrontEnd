import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare const Swal: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faApple = faApple;
  confirmarContra:any="";

  formularioRegistro = new FormGroup({
    NombreUsuario:new FormControl('', [Validators.required, Validators.maxLength(20)]),
    Correo:new FormControl('', [Validators.required, Validators.email]),
    Telefono :new FormControl('', [Validators.required, Validators.minLength(15) ]),
    Contraseña:new FormControl('', [Validators.required,  Validators.minLength(8)]),
  });

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit(): void {
  }

  registrarUsuario(){
    console.log(this.formularioRegistro.value);
    console.log(this.confirmarContra);
    if(this.formularioRegistro.value.Contraseña != this.confirmarContra){
      this.constraseñaMala();
    }
    else{
      this.usuariosService.añadirUsuario(this.formularioRegistro.value).subscribe(
        res=>{
          console.log(res);
          this.Registrado();
          setTimeout(()=>(window.location.href="inicio-sesion"), 2000) 
        }
      );
    }
  }

  
constraseñaMala(){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: `Las contraseñas no coinciden`,
    showConfirmButton: false,
    timer: 1500,
  });
}
  
Registrado(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Registrado con exito`,
    showConfirmButton: false,
    timer: 1500,
  });
}
}
