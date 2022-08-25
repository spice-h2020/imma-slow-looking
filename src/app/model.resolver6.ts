import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Exhibition } from "./exhibition.model";
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 



@Injectable() 
export class ModelResolver6  { 
    constructor( 
        private model6: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<Exhibition[]> {
        if(this.model6.getUsers().length == 0) {
            this.messages.reportMessage(new Message("Loading exhibitions..."));
            return this.dataSource.getExhibitionData();
        }
        else {
            return of(this.model6.getExhibitions());
        }
    } 

}
