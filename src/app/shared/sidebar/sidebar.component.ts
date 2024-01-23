import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private servicio : GifsService){}

  get tags(){
    return this.servicio.tagHistory;
  }

  history(tag : string){
    this.servicio.searchTag(tag);
  }

}
