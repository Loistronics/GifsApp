import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';



@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent, GifListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {

  gifService = inject(GifsService);

  

  


 }
