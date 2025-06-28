import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';



@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent, GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{

  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv ) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event : Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if( !scrollDiv ) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight; //Dimension de la pantalla (Punto de vista)
    const scrollHeight = scrollDiv.scrollHeight; //Maximo posible del scroll

    const estoyAlFinal = scrollTop + clientHeight + 100 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);
    
    if(estoyAlFinal){
      this.gifService.loadTrendingGifs();
    }

  }

 }
