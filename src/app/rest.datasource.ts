import { Injectable, Inject, InjectionToken } from "@angular/core"; 
import { HttpClient } from "@angular/common/http"; 
import { Observable } from "rxjs"; 
import { Theme } from "./theme.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Stage } from "./stage.model";
import { Activity } from "./activity.model";


@Injectable() export class RestDataSource { 

    private themeUrl = '';
    private artworkUrl = '';
    private scriptUrl = '';
    private activityUrl = '';
    private stageUrl = '';
    private config = {
        headers: {
        'Authorization': '"Basic xyz"'
        }};

    constructor(private http: HttpClient) { }
        
    getThemeData(): Observable<Theme[]> { 

        return this.http.get<Theme[]>(this.themeUrl, this.config); 
    } 

    getArtworkData(): Observable<Artwork[]> { 

        return this.http.get<Artwork[]>(this.artworkUrl, this.config); 
    } 

    getScriptData(): Observable<Script[]> { 

        return this.http.get<Script[]>(this.scriptUrl, this.config); 
    } 

    getActivityData(): Observable<Activity[]> { 

        return this.http.get<Activity[]>(this.activityUrl, this.config); 
    } 

    getStageData(): Observable<Stage[]> { 

        return this.http.get<Stage[]>(this.stageUrl, this.config); 
    } 
}


