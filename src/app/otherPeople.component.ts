import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paOtherPeople",
    templateUrl: "otherPeople.component.html"
})

export class OtherPeopleComponent {

    constructor(private model: Model){}
    // model: Model = new Model();

    mode: number = 1;
    
    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    getScriptsOfTheme(_id: string): Script[] {
        return this.model.getVisibleScriptsOfTheme(_id);
    }

    getApprovedActivitiesOfAScript(_id: string): Activity[] {
        return this.model.getApprovedActivitiesOfAScript(_id);
    }

    getArtworkFromId(artworkId: string) {
        return [this.getArtwork(artworkId)];
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

}