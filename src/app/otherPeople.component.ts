import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";
import { LinkText } from "./linktext.service";
import { CollectionArtwork } from "./collectionArtwork.model";
import { questionanswer } from "./action.model";
import { ConfigSettings } from "./config";
import { Stage } from "./stage.model";


@Component({
    selector: "paOtherPeople",
    templateUrl: "otherPeople.component.html"
})

export class OtherPeopleComponent {

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    constructor(private model: Model, private linktext: LinkText){}

    // configuration settings
    configSettings = new ConfigSettings;

    mode: number = 1;
    
    maximumResponses = 6;

    getThemes(): Theme[] {
        let themes =  this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }
    
    getScriptsOfTheme(_id: string): Script[] {
        return this.model.getVisibleRespondableScriptsOfTheme(_id);
    }

    sortAnswers(answers: questionanswer[]) {
        return answers.sort((a1, a2) => {if(a1.question > a2.question) {return 1;} else {return -1;}})
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

    // getNonHomepageArtworksOfScript(script: Script) {
    //     let otherartworks: Array<Artwork> = [];
    //     let artworkids = script.artworkids;
    //     let homepageartworkid = script.homepageartworkid;
    //     for(var artworkid of artworkids) {
    //         if(artworkid != homepageartworkid) {
    //             let artwork = this.getArtwork(artworkid);
    //             if(artwork != undefined) {
    //                 otherartworks.push(artwork);
    //             }
    //         }
    //     }
    //     return otherartworks;
    // }

    addLikeToActivity(activity: Activity) {
        activity.likes = activity.likes+1;
        this.model.saveActivity(activity);
    }
    
    getNonHomepageArtworksOfScript(script: Script) {
        let usedArtworks: Artwork[] = [];
        if(script.stages) {
            for(var stage of script.stages) {
                for(var stageArtworkId of stage.includeartworks) {
                    if(!usedArtworks.find(x => x._id == stageArtworkId) && stageArtworkId != script.homepageartworkid) {
                        let artwork = this.getArtwork(stageArtworkId);
                        if(artwork != undefined) {
                            usedArtworks.push(artwork);
                        }
                    }
                }
            }
        }
        return usedArtworks;
    }

    getScripts() {
        const scripts = this.model.getScripts();
        console.log(scripts);
        for(var script of scripts) {
            let newStages: Stage[] = [];
            for(var stage of script.stages) {
                stage.shuffle = false;
                newStages.push(stage);
            }
            script.stages = newStages;
            console.log(script);
            // this.model.saveScript(script);
        }
    }

}