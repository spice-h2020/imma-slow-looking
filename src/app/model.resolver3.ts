import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 
import { Theme } from "./theme.model";



@Injectable() 
export class ModelResolver3  { 
    constructor( 
        private model3: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<Theme[]> {
        if(this.model3.getThemes().length == 0) {
            this.messages.reportMessage(new Message("Loading themes..."));
            return this.dataSource.getThemeData();
        }
        else {
            return of(this.model3.getThemes());
        }
    } 

}
