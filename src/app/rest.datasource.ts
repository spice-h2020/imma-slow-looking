import { Injectable } from "@angular/core"; 
import { HttpClient } from "@angular/common/http"; 
import { Observable } from "rxjs"; 
import { Theme } from "./theme.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Activity } from "./activity.model";


@Injectable() export class RestDataSource { 

    private themeUrl = 'https://api2.mksmart.org/object/e7d38f43-26bb-41e0-ba72-7bc4bd3f0a1c?query=%7B%22type%22:%22theme%22%7D';
    private artworkUrl =  'https://api2.mksmart.org/object/e7d38f43-26bb-41e0-ba72-7bc4bd3f0a1c?query=%7B%22type%22:%22artwork%22%7D';
    private scriptUrl = 'https://api2.mksmart.org/object/e7d38f43-26bb-41e0-ba72-7bc4bd3f0a1c?query=%7B%22type%22:%22script%22%7D';
    private activityUrl = 'https://api2.mksmart.org/object/e7d38f43-26bb-41e0-ba72-7bc4bd3f0a1c?query=%7B%22type%22:%22activity%22%7D';
    private saveUrl = 'https://api2.mksmart.org/object/e7d38f43-26bb-41e0-ba72-7bc4bd3f0a1c';

    private config = {
        headers: {
        'Authorization': '"Basic MDBiOWE3ZWItYjRkZS00NTdiLWJmMzUtODQxYjhkMzdjODA3OjAwYjlhN2ViLWI0ZGUtNDU3Yi1iZjM1LTg0MWI4ZDM3YzgwNw=="'
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
        return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork, this.config); 
    }

    deleteArtwork(_id: string): Observable<Artwork> { 
        return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`); 
    }

    // Script
    getScriptData(): Observable<Script[]> { 
        return this.http.get<Script[]>(this.scriptUrl, this.config); 
    } 

    saveScript(script: Script): Observable<Script> { 
        return this.http.post<Script>(this.saveUrl, script, this.config); 
    }

    updateScript(script: Script): Observable<Script> {
        return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script, this.config); 
    }

    deleteScript(_id: string): Observable<Script> { 
        return this.http.delete<Script>(`${this.saveUrl}/${_id}`); 
    }

    // Activity
    getActivityData(): Observable<Activity[]> { 
        return this.http.get<Activity[]>(this.activityUrl, this.config); 
    } 

    saveActivity(activity: Activity): Observable<Activity> { 
        return  this.http.post<Activity>(this.saveUrl, activity, this.config); 
    }

    updateActivity(activity: Activity): Observable<Activity> {
        return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity, this.config); 
    }

    deleteActivity(_id: string): Observable<Activity> { 
        return this.http.delete<Activity>(`${this.saveUrl}/${_id}`); 
    }

}


