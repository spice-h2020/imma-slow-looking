import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Artwork } from "./artwork.model";
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 



@Injectable() 
export class ModelResolver2  { 
    constructor( 
        private model2: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<Artwork[]> {
        if(this.model2.getArtworks().length == 0) {
            this.messages.reportMessage(new Message("Loading artworks..."));
            return this.dataSource.getArtworkData();
        }
        else {
            return of(this.model2.getArtworks());
        }
    } 

}
