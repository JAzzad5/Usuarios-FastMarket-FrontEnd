import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productos-comercio',
  templateUrl: './productos-comercio.component.html',
  styleUrls: ['./productos-comercio.component.css']
})
export class ProductosComercioComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
