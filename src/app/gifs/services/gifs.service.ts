import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

    public gifList : Gif[] = []; 
    private _tagHistory : string[] = [];
    private api_key : string = "RsnR64hic8pp2G5lOumd4k8ve6Ru69Zb";
    private serviceUrl : string = "http://api.giphy.com/v1/gifs/";

    constructor(private http:HttpClient) {
        this.loadLocalStorage();
     }

    get tagHistory(){
        //Forma correcta de devolver una lista. Usando el operador "Spread"
        return [...this._tagHistory];
    }

    public searchTag(tag : string) : void{
        if (tag.length == 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams().set('api_key',this.api_key).set('limit',10).set('q',tag);
        this.http.get<SearchResponse>(`${this.serviceUrl}search`,{params}).subscribe(resp => {
            this.gifList = resp.data;
        });
    }

    private organizeHistory(tag : string){
        tag = tag.toLowerCase();
        if(this._tagHistory.includes(tag)){
            //Se crea un array nuevo que cumpla la condicion dada. En este caso que no contenga la misma palabra que se esta insertando
            this._tagHistory = this._tagHistory.filter((oldTag) => oldTag != tag);
        }
        //Agrego elemento al inicio de la lista
        this._tagHistory.unshift(tag);
        //Se limita la lista a un maximo de 10 valores
        this._tagHistory = this._tagHistory.splice(0,10);
        this.saveLocalStorage();
    }

    private saveLocalStorage() : void{
        //El localStorage solo permite String. Por lo que convertimos en un String el JSON con la lista
        localStorage.setItem("History", JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage() : void{
        if(!localStorage.getItem("History")) return; //Si no existe nada guardado en el localStorage salgo

        this._tagHistory = JSON.parse(localStorage.getItem("History")!); //Como se esta realizando una conversion TS se protege contra un valor NULL. El ! es para permitir un tipo String | null

        if(this._tagHistory.length === 0) return; //Se valida si la lista esta vacia luego de leer el local storage

        this.searchTag(this._tagHistory[0]); //Se realiza una busqueda de los GIFs de la ultima busqueda

    }
    
}