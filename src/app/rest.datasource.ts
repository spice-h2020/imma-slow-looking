import { Injectable } from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { observable, Observable, Observer } from "rxjs"; 
import { Theme } from "./theme.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Activity } from "./activity.model";
import { CollectionArtwork } from "./collectionArtwork.model";
import { User } from "./user.model";
import { ConfigSettings } from "./config";

@Injectable() export class RestDataSource { 

    // configuration settings
    private configSettings = new ConfigSettings;
    
    // Citizen data URLs 
    private userUrl = 'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22user%22%7D&limit=9999'
    private themeUrl = 'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22theme%22%7D&limit=9999';
    private artworkUrl =  'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22artwork%22%7D&limit=9999';
    private scriptUrl = 'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22script%22%7D&limit=9999';
    private activityUrl = 'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22activity%22%7D&limit=9999';
    private saveUrl = 'https://api2.mksmart.org/object/' + this.configSettings.citizenDatasetUUID;

    constructor(private http: HttpClient) { }

    // User
    getUserData(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl, this.configSettings.config);
    }

    saveUser(user: User): Observable<User> {
        return this.http.post<User>(this.saveUrl, user, this.configSettings.config);
    }

    updateUser(user: User) {
        return this.http.put<User>(`${this.saveUrl}/${user._id}`, user, this.configSettings.config);
    }

    deleteUser(_id: string) {
        return this.http.delete<User>(`${this.saveUrl}/${_id}`, this.configSettings.config);
    }
    
    // Theme
    getThemeData(): Observable<Theme[]> { 
        return this.http.get<Theme[]>(this.themeUrl, this.configSettings.config); 
    } 

    saveTheme(theme: Theme): Observable<Theme> { 
        return this.http.post<Theme>(this.saveUrl, theme, this.configSettings.config); 
    }

    updateTheme(theme: Theme): Observable<Theme> {
        return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme, this.configSettings.config); 
    }

    deleteTheme(_id: string): Observable<Theme> { 
        return this.http.delete<Theme>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
    }

    // Artwork
    getArtworkData(): Observable<Artwork[]> { 
        return this.http.get<Artwork[]>(this.artworkUrl, this.configSettings.config); 
    } 

    saveArtwork(artwork: Artwork): Observable<Artwork> { 
        return this.http.post<Artwork>(this.saveUrl, artwork, this.configSettings.config); 
    }

    updateArtwork(artwork: Artwork): Observable<Artwork> {
        return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork, this.configSettings.config); 
    }

    deleteArtwork(_id: string): Observable<Artwork> { 
        return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
    }

    // Script
    getScriptData(): Observable<Script[]> { 
        return this.http.get<Script[]>(this.scriptUrl, this.configSettings.config); 
    } 

    saveScript(script: Script): Observable<Script> { 
        return this.http.post<Script>(this.saveUrl, script, this.configSettings.config); 
    }

    updateScript(script: Script): Observable<Script> {
        return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script, this.configSettings.config); 
    }

    deleteScript(_id: string): Observable<Script> { 
        return this.http.delete<Script>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
    }

    // Activity
    getActivityData(): Observable<Activity[]> { 
        return this.http.get<Activity[]>(this.activityUrl, this.configSettings.config); 
    } 

    saveActivity(activity: Activity): Observable<Activity> { 
        return  this.http.post<Activity>(this.saveUrl, activity, this.configSettings.config); 
    }

    updateActivity(activity: Activity): Observable<Activity> {
        return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity, this.configSettings.config); 
    }

    deleteActivity(_id: string): Observable<Activity> { 
        return this.http.delete<Activity>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
    }

    //Collection query

    private collectionURL = "https://api2.mksmart.org/query/" + this.configSettings.collectionDatasetUUID + "/sparql?query=" + this.configSettings.collectionQuery;
      
    getCollection(): Observable<CollectionArtwork> {

        const obs = new Observable((observer) => {
            this.http.get<any>(this.collectionURL, this.configSettings.config).subscribe(data => {
                let resarray:  Array<CollectionArtwork> = [];
                for(var item of data["results"]["bindings"]) {
                    observer.next(new CollectionArtwork(item["title"]["value"], item["creatorname"]["value"], item["year"]["value"], item["artworkurl"]["value"], item["title"]["value"]+', '+item["creatorname"]["value"]+', '+item["year"]["value"]));
                }
                observer.complete();
            });
        });
        return obs;
    }
    

}


