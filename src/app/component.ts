import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";


@Component({
    selector: 'app',
    templateUrl: './template.html'
})
export class SlowLookingComponent {
    model: Model = new Model();

    mode: number = 0;

    editrow: number = 0;

    tableEditing: boolean = false;

    newTheme: Theme = new Theme();

    addTheme(theme: Theme) {
        this.model.saveTheme(theme);
        this.newTheme = new Theme();
        this.tableEditing = false;
    }

    getArtworks(): Artwork[] {
        return this.model.getArtworks();
    }

    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    getScripts(): Script[] {
        return this.model.getScripts();
    }

    getOpenVisibleScripts(): Script[] {
        return this.model.getOpenVisibleScripts();
    }

    getActivities(): Activity[] {
        return this.model.getActivities();
    }

    getScript(id: number): Script {
        return this.model.getScript(id);
    }

    getScriptsOfTheme(id: number): Script[] {
        return this.model.getScriptsOfTheme(id);
    }

    getApprovedActivities(): Activity[] {
        return this.model.getApprovedActivities();
    }

    getApprovedVisibleActivities(): Activity[] {
        return this.model.getApprovedVisibleActivities();
    }

    getUnpprovedActivities(): Activity[] {
        return this.model.getUnapprovedActivities();
    }

}