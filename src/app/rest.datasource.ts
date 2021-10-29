import { Injectable } from "@angular/core"; 
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { observable, Observable, Observer } from "rxjs"; 
import { Theme } from "./theme.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Activity } from "./activity.model";
import { CollectionArtwork } from "./collectionArtwork.model";
import { User } from "./user.model";

@Injectable() export class RestDataSource { 

    private userUrl = ''
    private themeUrl = '';
    private artworkUrl =  '';
    private scriptUrl = '';
    private activityUrl = '';
    private saveUrl = '';

    private config = {
        headers: {
            Authorization: 'Basic xyz'
        }};

    constructor(private http: HttpClient) { }

    // User
    getUserData(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl, this.config);
    }

    saveUser(user: User): Observable<User> {
        return this.http.post<User>(this.saveUrl, user, this.config);
    }

    updateUser(user: User) {
        return this.http.put<User>(`${this.saveUrl}/${user._id}`, user, this.config);
    }

    deleteUser(_id: string) {
        return this.http.delete<User>(`${this.saveUrl}/${_id}`, this.config);
    }
    
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
        return this.http.delete<Theme>(`${this.saveUrl}/${_id}`, this.config); 
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
        return this.http.delete<Artwork>(`${this.saveUrl}/${_id}`, this.config); 
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
        return this.http.delete<Script>(`${this.saveUrl}/${_id}`, this.config); 
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
        return this.http.delete<Activity>(`${this.saveUrl}/${_id}`, this.config); 
    }

    //IMMA collection

    private collectionQuery = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23> " +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> " +
    "SELECT ?artwork ?title ?creatorname ?artworkurl ?year " +
    "WHERE { " +
    "?artwork rdf:type <http://schema.org/CreativeWork> . " +
    "?artwork <https://w3id.org/arco/ontology/context-description/hasTitle> ?title . " +
    "?artwork <http://purl.org/dc/elements/1.1/creator> ?creator . " +
    "?creator <http://www.w3.org/2000/01/rdf-schema%23label> ?creatorname . " +
    "?artwork <http://schema.org/image> ?image . " +
    "?image <http://schema.org/url> ?artworkurl . " +
    "?artwork  <http://schema.org/dateCreated> ?year } ";

    private collectionURL = "https://api2.mksmart.org/query/f9e601f0-06e6-4733-a791-ec42f3aab80e/sparql?query=" + this.collectionQuery;
      
    getCollection(): Observable<CollectionArtwork> {

        const obs = new Observable((observer) => {
            this.http.get<any>(this.collectionURL, this.config).subscribe(data => {
                let resarray:  Array<CollectionArtwork> = [];
                for(var item of data["results"]["bindings"]) {
                    observer.next(new CollectionArtwork(item["title"]["value"], item["creatorname"]["value"], item["year"]["value"], item["artworkurl"]["value"]));
                }
                observer.complete();
            });
        });
        return obs;
    }
    

}


