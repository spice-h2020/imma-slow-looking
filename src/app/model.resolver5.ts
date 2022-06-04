import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 
import { User } from "./user.model";



@Injectable() 
export class ModelResolver5  { 
    constructor( 
        private model5: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        if(this.model5.getUsers().length == 0) {
            this.messages.reportMessage(new Message("Loading users..."));
            return this.dataSource.getUserData();
        }
        else {
            return of(this.model5.getUsers());
        }
    } 

}
