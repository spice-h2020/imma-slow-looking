import { Component } from "@angular/core";
import { retry } from "rxjs/operators";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";
import { User } from "./user.model";

@Component({
    selector: "paOtherPeople",
    templateUrl: "otherPeople.component.html"
})

export class OtherPeopleComponent {

    constructor(private model: Model){}

    mode: number = 1;
    
    maximumResponses = 6;

    getThemes(): Theme[] {
        let themes =  this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }
    
    getScriptsOfTheme(_id: string): Script[] {
        return this.model.getVisibleScriptsOfTheme(_id);
    }

    getApprovedActivitiesOfAScript(_id: string): Activity[] {
        let activities = this.model.getApprovedActivitiesOfAScript(_id);
        return activities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    getArtworkFromId(artworkId: string) {
        let artwork = this.getArtwork(artworkId);
        if(artwork == undefined) {
            return [];
        }
        else {
            return [artwork]
        }
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

    getNonHomepageArtworksOfScript(script: Script) {
        let otherartworks: Array<Artwork> = [];
        let artworkids = script.artworkids;
        let homepageartworkid = script.homepageartworkid;
        for(var artworkid of artworkids) {
            if(artworkid != homepageartworkid) {
                let artwork = this.getArtwork(artworkid);
                if(artwork != undefined) {
                    otherartworks.push(artwork);
                }
            }
        }
        return otherartworks;
    }

    addLikeToActivity(activity: Activity) {
        activity.likes = activity.likes+1;
        this.model.saveActivity(activity);
    }

    getThemeData(): {theme: Theme, user: string}[] {
        const themes = this.getThemes();
        const users: User[] = this.model.getUsers();
        let res: {theme: Theme, user: string}[] = [];
        for(var theme of themes) {
            let ind = users.findIndex(x => x._id = theme.owner);
            if(ind > -1) {
                res.push({theme: theme, user: users[ind].username});
            }
            else {
                res.push({theme: theme, user: ""});
            }
        }
        return res;
    }

    getScriptData(): {script: Script, hpartwork: string, stagesartworks: string[][]}[] {
        const scripts = this.model.getScripts();
        const artworks = this.model.getArtworks();
        let res: {script: Script, hpartwork: string, stagesartworks: string[][]}[] = [];
        for(var script of scripts) {
            let artworklist: string[][] = [];
            for(var stage of script.stages) {
                let stageartworks: string[] = [];
                for(var artworkid of stage.includeartworks) {
                    let ind = artworks.findIndex(x => x._id == artworkid);
                    if(ind > -1) {
                        stageartworks.push(artworks[ind].name + ", " + artworks[ind].artist + ", " + artworks[ind].year);
                    }
                }
                artworklist.push(stageartworks);
            }
            let hpartwork =  "";
            let ind = artworks.findIndex(x => x._id == script.homepageartworkid);
            if(ind > -1) {
                hpartwork =  artworks[ind].name + ", " + artworks[ind].artist + ", " + artworks[ind].year;
            }
            res.push({script: script, hpartwork: hpartwork, stagesartworks: artworklist});
        }
        return res;
    }

    getScriptDashboardData() {
        console.log("hello");
        const scripts = this.model.getScripts();
        const artworks = this.model.getArtworks();
        const themes = this.model.getThemes();
        let artworkResults: {artworkurl: string, name: string, artist: string, year: string, searchstring: string, scripts: Script[]}[] = [];
        let themeResults: {themeid: string, name: string, description: string, searchstring: string, scripts: Script[]}[] = [];
        let scriptResults: {searchstring: string, script: Script}[] = [];
        for(var script of scripts) {
            if(script.visible) {

                //add to the artwork result array
                for(var artworkid of script.artworkids) {
                    let artind = artworks.findIndex(x => x._id == artworkid);
                    if(artind > -1) {
                        let artresind = artworkResults.findIndex(x => x.artworkurl == artworks[artind].url);
                        if(artresind > -1) {
                            artworkResults[artresind].scripts.push(script);
                        }
                        else {
                            artworkResults.push({artworkurl: artworks[artind].url, name: artworks[artind].name, artist: artworks[artind].artist, year: artworks[artind].year, searchstring: artworks[artind].name+", "+artworks[artind].artist+", "+artworks[artind].year, scripts: [script]});
                        }
                    }
                }

                //add to the theme result array
                for(var themeid of script.themeids) {
                    let themeresind = themeResults.findIndex(x => x.themeid == themeid);
                    if(themeresind > -1) {
                        themeResults[themeresind].scripts.push(script);
                    }
                    else {
                        let themeind = themes.findIndex(x => x._id == themeid);
                        if(themeind > -1) {
                            themeResults.push({themeid: themeid, name: themes[themeind].name, description: themes[themeind].description, searchstring: themes[themeind].name+": "+themes[themeind].description, scripts: [script]});
                        }
                    }
                }

                //add to the script result array
                scriptResults.push({searchstring: script.name+": "+script.description+" - "+script.author, script: script});
            }
        }
        console.log(artworkResults);
        console.log(themeResults);
        console.log(scriptResults);
    }

}