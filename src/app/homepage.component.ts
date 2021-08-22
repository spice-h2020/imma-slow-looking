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
    // model: Model = new Model();

    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    getScriptsOfTheme(id: number): Script[] {
        return this.model.getScriptsOfTheme(id);
    }

    mode: number = 1;
}