import { Injectable } from "@angular/core"; 
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"; 
import { Observable, of } from "rxjs"; 
import { Activity } from "./activity.model";
import { Message } from "./messages/message.model";
import { MessageService } from "./messages/message.service";
import { Model } from "./repository.model" 
import { RestDataSource } from "./rest.datasource"; 



@Injectable() 
export class ModelResolver4  { 
    constructor( 
        private model4: Model, 
        private dataSource: RestDataSource,
        private messages: MessageService ) { } 
        
    resolve(route: ActivatedRouteSnapshot): Observable<Activity[]> {
        if(this.model4.getActivities().length == 0) {
            this.messages.reportMessage(new Message("Loading activities..."));
            return this.dataSource.getActivityData();
        }
        else {
            return of(this.model4.getActivities());
        }
    } 
}
