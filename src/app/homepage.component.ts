import { Component } from "@angular/core";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paHomepage",
    templateUrl: "homepage.component.html"
})

export class HomepageComponent {

    constructor(private model: Model){}

    getThemes(): Theme[] {
        let themes =  this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }

    getScriptsOfTheme(_id: string): Script[] {
        return this.model.getScriptsOfTheme(_id);
    }

    getArtworkFromId(artworkId: string) {
        return [this.getArtwork(artworkId)];
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }
    
    mode: number = 1;
}