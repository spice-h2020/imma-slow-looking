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
        let scripts = this.model.getScriptsOfTheme(_id);
        return scripts;
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
        let artwork = this.model.getArtwork(_id);
        return artwork;
    }
    
    mode: number = 1;
}