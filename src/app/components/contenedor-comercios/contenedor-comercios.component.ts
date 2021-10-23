import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faStar, faClock, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contenedor-comercios',
  templateUrl: './contenedor-comercios.component.html',
  styleUrls: ['./contenedor-comercios.component.css']
})
export class ContenedorComerciosComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faStar=faStar;
  faClock=faClock;
  faMoneyBillAlt=faMoneyBillAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
