import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent { 

  gifservice = inject(GifsService);

  /* query = inject(ActivatedRoute).params.subscribe(
    params => {
      console.log(params['query']);
    }
  ) */


  query = toSignal(
    //De un observable, usamos pipe para mapear la informacion y luego todo el resultado lo convertimos en senal
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'])
    )
  );

  gifsByKey = computed(() => {
    return this.gifservice.getHistoryGifs(this.query())
  });
  

}

