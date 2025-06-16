import { GifMapper } from './../mapper/gif.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendinggGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((resp)=> {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendinggGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    });
  }

}
