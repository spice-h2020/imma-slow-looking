import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";

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
}