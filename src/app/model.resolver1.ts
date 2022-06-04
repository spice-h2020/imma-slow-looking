import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 
import { Script } from "./script.model";



@Injectable() 
export class ModelResolver1  { 
    constructor( 
        private model1: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<Script[]> {
        if(this.model1.getScripts().length == 0) {
            this.messages.reportMessage(new Message("Loading scripts..."));
            return this.dataSource.getScriptData();
        }
        else {
            return of(this.model1.getScripts());
        }
    } 

}
