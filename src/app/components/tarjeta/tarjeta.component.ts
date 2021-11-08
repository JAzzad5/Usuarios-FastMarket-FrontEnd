import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faCcVisa=faCcVisa;
  faCcMastercard=faCcMastercard;
  constructor() { }

  ngOnInit(): void {
  }

}
