import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagHistory : string[] = [];

    constructor() { }

    get tagHistory(){
        //Forma correcta de devolver una lista. Usando el operador "Spread"
        return [...this._tagHistory];
    }

    public searchTag(tag : string) : void{
        if (tag.length == 0) return;
        this.organizeHistory(tag);
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
    }
    
}