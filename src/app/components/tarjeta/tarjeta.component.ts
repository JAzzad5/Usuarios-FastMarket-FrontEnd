import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
declare const Swal: any;

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faCcVisa=faCcVisa;
  faCcMastercard=faCcMastercard;
  User="61784e12a85334e2f36e9a95";
  Usuario:any= {};
  btnEditar = true;
  formTarjeta:any ={};
  
  formularioTarjeta = new FormGroup({
    NombreTarjeta:new FormControl('', [Validators.required, Validators.maxLength(30)]),
    Numero:new FormControl('', [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]),
    FechaVencimiento :new FormControl('', [Validators.required]),
    CVV:new FormControl('', [Validators.required,Validators.min(100), Validators.max(9999)])
  });

  constructor(private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    this.cargarUsuario();
    setTimeout( () => this.verificarCambios(),3000) ;
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

  
  cargarDatos(){
    this.formTarjeta = {
      NombreTarjeta: this.Usuario.Tarjeta.NombreTarjeta,
      Numero: this.Usuario.Tarjeta.Numero,
      FechaVencimiento : this.Usuario.Tarjeta.FechaVencimiento ,
      CVV: this.Usuario.Tarjeta.CVV
    }
    this.formularioTarjeta.setValue({
      NombreTarjeta: this.Usuario.Tarjeta.NombreTarjeta,
      Numero: this.Usuario.Tarjeta.Numero,
      FechaVencimiento : this.Usuario.Tarjeta.FechaVencimiento ,
      CVV: this.Usuario.Tarjeta.CVV
    });

    if(this.formularioTarjeta.value.NombreTarjeta == ""){
      console.log("sin nombre de tarjeta")
      this.formularioTarjeta.patchValue({
        NombreTarjeta: this.Usuario.NombreUsuario
      });
    }

  }

  editarTarjeta(){
    console.log(this.formTarjeta);
    console.log(this.formularioTarjeta.value);
    if(JSON.stringify(this.formTarjeta) == JSON.stringify(this.formularioTarjeta.value)){
      console.log("sin Cambios")
      this.sinCambios();
    }
    else{
      console.log("con cambios")
      this.usuarioService.editarTarjeta(this.User, this.formularioTarjeta.value).subscribe(
        res=>{
          console.log(res);
          this.correcto();
          this.cargarUsuario();
        }
      );
    }
  }

  verificarCambios(){
    this.formularioTarjeta.valueChanges.subscribe(x => {
      this.btnEditar = false;
    })
  }

  correcto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Tarjeta Editada`,
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
