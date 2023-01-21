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
import { Exhibition } from "./exhibition.model";

@Injectable() export class RestDataSource { 

    // configuration settings
    private configSettings = new ConfigSettings;

    private APIURL = this.configSettings.APIURL;

    // Citizen data URLs 
    private exhibitionUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22exhibition%22%7D&limit=9999';
    private userUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22user%22%7D&limit=9999';
    private themeUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22theme%22%7D&limit=9999';
    private artworkUrl =  this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22artwork%22%7D&limit=9999';
    private scriptUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22script%22%7D&limit=9999';
    private activityUrl = this.APIURL + this.configSettings.citizenDatasetUUID + '?query=%7B%22type%22:%22activity%22%7D&limit=9999';
    private saveUrl = this.APIURL + this.configSettings.citizenDatasetUUID;

    constructor(private http: HttpClient) { }

    //Exhibition
    getExhibitionData(): Observable<Exhibition[]> {
        // return this.http.get<Exhibition[]>(this.exhibitionUrl, this.configSettings.config);
        return this.http.get<Exhibition[]>(this.exhibitionUrl);
    }

    saveExhibition(exhibition: Exhibition): Observable<User> {
        // return this.http.post<Exhibition>(this.saveUrl, exhibition, this.configSettings.config);
        return this.http.post<Exhibition>(this.saveUrl, exhibition);
    }

    updateExhibition(exhibition: Exhibition) {
        // return this.http.put<Exhibition>(`${this.saveUrl}/${exhibition._id}`, exhibition, this.configSettings.config);
        return this.http.put<Exhibition>(`${this.saveUrl}/${exhibition._id}`, exhibition);
    }

    deleteExhibition(_id: string) {
        // return this.http.delete<Exhibition>(`${this.saveUrl}/${_id}`, this.configSettings.config);
        return this.http.delete<Exhibition>(`${this.saveUrl}/${_id}`);
    }

    // User
    getUserData(): Observable<User[]> {
        // return this.http.get<User[]>(this.userUrl, this.configSettings.config);
        return this.http.get<User[]>(this.userUrl);
    }

    saveUser(user: User): Observable<User> {
        // return this.http.post<User>(this.saveUrl, user, this.configSettings.config);
        return this.http.post<User>(this.saveUrl, user);
    }

    updateUser(user: User) {
        // return this.http.put<User>(`${this.saveUrl}/${user._id}`, user, this.configSettings.config);
        return this.http.put<User>(`${this.saveUrl}/${user._id}`, user);
    }

    deleteUser(_id: string) {
        // return this.http.delete<User>(`${this.saveUrl}/${_id}`, this.configSettings.config);
        return this.http.delete<User>(`${this.saveUrl}/${_id}`);
    }
    
    // Theme
    getThemeData(): Observable<Theme[]> { 
        // return this.http.get<Theme[]>(this.themeUrl, this.configSettings.config); 
        return this.http.get<Theme[]>(this.themeUrl); 
    } 

    saveTheme(theme: Theme): Observable<Theme> { 
        // return this.http.post<Theme>(this.saveUrl, theme, this.configSettings.config); 
        return this.http.post<Theme>(this.saveUrl, theme); 
    }

    updateTheme(theme: Theme): Observable<Theme> {
        // return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme, this.configSettings.config); 
        return this.http.put<Theme>(`${this.saveUrl}/${theme._id}`, theme); 
    }

    deleteTheme(_id: string): Observable<Theme> { 
        // return this.http.delete<Theme>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Theme>(`${this.saveUrl}/${_id}`); 
    }

    // Artwork
    getArtworkData(): Observable<Artwork[]> { 
        // return this.http.get<Artwork[]>(this.artworkUrl, this.configSettings.config); 
        return this.http.get<Artwork[]>(this.artworkUrl); 
    } 

    saveArtwork(artwork: Artwork): Observable<Artwork> { 
        // return this.http.post<Artwork>(this.saveUrl, artwork, this.configSettings.config); 
        return this.http.post<Artwork>(this.saveUrl, artwork); 
    }

    updateArtwork(artwork: Artwork): Observable<Artwork> {
        // return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork, this.configSettings.config); 
        return this.http.put<Artwork>(`${this.saveUrl}/${artwork._id}`, artwork); 
    }

    deleteArtwork(_id: string): Observable<Artwork> { 
        // return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`); 
    }

    // Script
    getScriptData(): Observable<Script[]> { 
        // return this.http.get<Script[]>(this.scriptUrl, this.configSettings.config); 
        return this.http.get<Script[]>(this.scriptUrl); 
    } 

    saveScript(script: Script): Observable<Script> { 
        // return this.http.post<Script>(this.saveUrl, script, this.configSettings.config); 
        return this.http.post<Script>(this.saveUrl, script); 
    }

    updateScript(script: Script): Observable<Script> {
        // return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script, this.configSettings.config); 
        return this.http.put<Script>(`${this.saveUrl}/${script._id}`, script); 
    }

    deleteScript(_id: string): Observable<Script> { 
        // return this.http.delete<Script>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Script>(`${this.saveUrl}/${_id}`); 
    }

    // Activity
    getActivityData(): Observable<Activity[]> { 
        // return this.http.get<Activity[]>(this.activityUrl, this.configSettings.config); 
        return this.http.get<Activity[]>(this.activityUrl); 
    } 

    saveActivity(activity: Activity): Observable<Activity> { 
        // return  this.http.post<Activity>(this.saveUrl, activity, this.configSettings.config); 
        return  this.http.post<Activity>(this.saveUrl, activity); 
    }

    updateActivity(activity: Activity): Observable<Activity> {
        // return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity, this.configSettings.config); 
        return this.http.put<Activity>(`${this.saveUrl}/${activity._id}`, activity); 
    }

    deleteActivity(_id: string): Observable<Activity> { 
        // return this.http.delete<Activity>(`${this.saveUrl}/${_id}`, this.configSettings.config); 
        return this.http.delete<Activity>(`${this.saveUrl}/${_id}`); 
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


