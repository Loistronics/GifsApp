import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gift-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(private servicio : GifsService){}

  @ViewChild('textoInput')
  public tagInput! : ElementRef<HTMLInputElement>;

  searchTag(){
    //Obtengo el valor del Input el cual fue referenciado como #textoInput
    const busqueda  = this.tagInput.nativeElement.value;

    this.servicio.searchTag(busqueda);

    //Se limpia el valor del buscador
    this.tagInput.nativeElement.value = '';
  }

}
