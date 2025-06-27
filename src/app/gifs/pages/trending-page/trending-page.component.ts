import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';



@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent, GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  gifService = inject(GifsService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event : Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv ) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight; //Dimension de la pantalla (Punto de vista)
    const scrollHeight = scrollDiv.scrollHeight; //Maximo posible del scroll

    const estoyAlFinal = scrollTop + clientHeight + 100 >= scrollHeight;
    
    if(estoyAlFinal){
      this.gifService.loadTrendingGifs();
    }

  }

 }
