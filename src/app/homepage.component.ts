import { Component } from "@angular/core";
import { ConfigSettings } from "./config";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paHomepage",
    templateUrl: "homepage.component.html"
})

export class HomepageComponent {

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }
    
    constructor(private model: Model){}

    // configuration settings
    configSettings = new ConfigSettings;

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