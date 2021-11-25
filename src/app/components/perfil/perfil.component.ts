import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const Swal: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor(private usuarioService:UsuariosService) { }
  User="61784e12a85334e2f36e9a95";
  Usuario:any= {};
  formDeValidacion = {};
  btnEditar = true;


  formularioUsuario = new FormGroup({
    NombreUsuario:new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ImagenUsuario:new FormControl(''),
    Correo :new FormControl('', [Validators.required, Validators.email ]),
    Telefono:new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

    this.cargarUsuario();
    setTimeout( () => this.verificarCambios(),3000) ;
  }


  cargarDatos(){
    this.formDeValidacion = {
      NombreUsuario: this.Usuario.NombreUsuario,
      ImagenUsuario: this.Usuario.ImagenUsuario,
      Correo: this.Usuario.Correo,
      Telefono: this.Usuario.Telefono,
    }
    this.formularioUsuario.setValue({
      NombreUsuario: this.Usuario.NombreUsuario,
      ImagenUsuario: '',
      Correo: this.Usuario.Correo,
      Telefono: this.Usuario.Telefono,
    });
  }

  cargarUsuario(){
    this.usuarioService.obtenerUsuario(this.User).subscribe(
      res=>{
        this.Usuario =res;
        console.log("Usuario",this.Usuario)
        this.cargarDatos();
      },
      error=>{
        console.log(error);
      }
    );
  }

  verificarCambios(){
    this.formularioUsuario.valueChanges.subscribe(x => {
      this.btnEditar = false;
    })
  }

  editarUsuario(){
      
    const NombreImagen = this.formularioUsuario.value.ImagenUsuario.split("\\");
    this.formularioUsuario.value.ImagenUsuario = NombreImagen[NombreImagen.length - 1];
    if(this.formularioUsuario.value.ImagenUsuario == ''){
      this.formularioUsuario.value.ImagenUsuario = this.Usuario.ImagenUsuario;
    }
    if(JSON.stringify(this.formDeValidacion) == JSON.stringify(this.formularioUsuario.value)){
      console.log("sin Cambios")
      this.sinCambios();
    }
    else {
      console.log("con Cambios")
      this.usuarioService.editarUsuario(this.User,this.formularioUsuario.value).subscribe(
        res=>{
          console.log(res);
          this.correcto();
          this.cargarUsuario();
        }
      );
    }
  }

  correcto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Perfil Editado`,
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
