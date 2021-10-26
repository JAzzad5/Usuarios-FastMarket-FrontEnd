import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  faUser = faUser;
  faMapMarkerAlt = faMapMarkerAlt;
  faShoppingCart = faShoppingCart;


  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  abrirCarrito(modal:any){
    this.modalService.open(
      modal,
      {
        size:'s',
        centered:true
      }
    );
  }
}
