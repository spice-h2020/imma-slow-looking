import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 
import { ScriptSet } from "./scriptSet.model";



@Injectable() 
export class ModelResolver7  { 
    constructor( 
        private model7: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<ScriptSet[]> {
        if(this.model7.getScriptSets().length == 0) {
            this.messages.reportMessage(new Message("Loading scriptsets..."));
            return this.dataSource.getScriptSetData();
        }
        else {
            return of(this.model7.getScriptSets());
        }
    } 

}
