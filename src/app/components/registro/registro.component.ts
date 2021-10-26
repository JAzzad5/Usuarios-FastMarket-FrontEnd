import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faApple = faApple;
  constructor() { }

  ngOnInit(): void {
  }

}
