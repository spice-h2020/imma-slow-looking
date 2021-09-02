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
    private saveUrl = '';
    private config = {
        headers: {
        'Authorization': '"Basic xyz"'
        }};

    constructor(private http: HttpClient) { }

    // Theme
    getThemeData(): Observable<Theme[]> { 
        return this.http.get<Theme[]>(this.themeUrl, this.config); 
    } 

    saveTheme(theme: Theme): Observable<Theme> { 
        return this.http.post<Theme>(this.saveUrl, theme, this.config); 
    }

    updateTheme(theme: Theme): Observable<Theme> {
        console.log(`${this.saveUrl}/${theme._id}`);
        return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme, this.config); 
    }

    deleteTheme(_id: string): Observable<Theme> { 
        return this.http.delete<Theme>(`${this.saveUrl}/${_id}`); 
    }


    // Artwork
    getArtworkData(): Observable<Artwork[]> { 
        return this.http.get<Artwork[]>(this.artworkUrl, this.config); 
    } 

    saveArtwork(artwork: Artwork): Observable<Artwork> { 
        return this.http.post<Artwork>(this.saveUrl, artwork, this.config); 
    }

    updateArtwork(artwork: Artwork): Observable<Artwork> {
        return this.http.put<Artwork>(`${this.saveUrl}/${artwork.id}`, artwork, this.config); 
    }

    // Script
    getScriptData(): Observable<Script[]> { 
        return this.http.get<Script[]>(this.scriptUrl, this.config); 
    } 

    saveScript(script: Script): Observable<Script> { 
        return this.http.post<Script>(this.saveUrl, script, this.config); 
    }

    updateScript(script: Script): Observable<Script> {
        return this.http.put<Script>(`${this.saveUrl}/${script.id}`, script, this.config); 
    }

    // Activity
    getActivityData(): Observable<Activity[]> { 
        return this.http.get<Activity[]>(this.activityUrl, this.config); 
    } 

    saveActivity(activity: Activity): Observable<Activity> { 
        return this.http.post<Activity>(this.saveUrl, activity, this.config); 
    }

    updateActivity(activity: Activity): Observable<Activity> {
        return this.http.put<Activity>(`${this.saveUrl}/${activity.id}`, activity, this.config); 
    }

    // Stage
    getStageData(): Observable<Stage[]> { 
        return this.http.get<Stage[]>(this.stageUrl, this.config); 
    } 

    saveStage(stage: Stage): Observable<Stage> { 
        return this.http.post<Stage>(this.saveUrl, stage, this.config); 
    }

    updateStage(stage: Stage): Observable<Stage> {
        return this.http.put<Stage>(`${this.saveUrl}/${stage.id}`, stage, this.config); 
    }
}


