import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { StaticDataSource } from "./datasource.model";
import { Theme } from "./theme.model";
import { Stage } from "./stage.model";

export class Model {
    private dataSource: StaticDataSource;
    private themes: Theme[];
    private artworks: Artwork[];
    private scripts: Script[];
    private activities: Activity[];
    private locator = (x: any, id: number) => x.id == id;
    private openAndVisible = (x: any) => (x.open && x.visible);
    private approved = (x: any) => (x.approved);
    private unapproved = (x: any) => (!x.approved);
    private hasTheme = (x: any, id: number) => x.themes.find(e => e.id == id);

    constructor() {
        this.dataSource = new StaticDataSource;

        this.themes = new Array<Theme>();
        this.dataSource.getThemeData().forEach(x => this.themes.push(x));

        this.artworks = new Array<Artwork>();
        this.dataSource.getArtworkData().forEach(x => this.artworks.push(x));

        this.scripts = new Array<Script>();
        this.dataSource.getScriptData().forEach(x => this.scripts.push(x));

        this.activities = new Array<Activity>();
        this.dataSource.getActivityData().forEach(x => this.activities.push(x));
    }

    getThemes(): Theme[] {
        return this.themes;
    }

    getTheme(id: number) {
        return this.themes.find(x => this.locator(x, id));
    }

    saveTheme(theme: Theme) {
        if (theme.id == 0 || theme.id == null) {
            theme.id = this.generateThemeID();
            this.themes.push(theme);
        } else {
            let index = this.themes.findIndex(x => this.locator(x, theme.id));
            this.themes.splice(index, 1, theme);
        }
    }

    deleteTheme(id: number) {
        let index = this.themes.findIndex(x => this.locator(x, id));
        if (index > -1) {
            this.themes.splice(index, 1);
        }
    }

    getArtworks(): Artwork[] {
        return this.artworks;
    }

    getScripts(): Script[] {
        return this.scripts;
    }

    getOpenVisibleScripts(): Script[] {
        return this.scripts.filter(x => this.openAndVisible(x))
    }

    getScriptsOfTheme(id: number): Script[] {
        return this.getOpenVisibleScripts().filter(x => this.hasTheme(x, id))
    }

    getScript(id: number): Script {
        return this.scripts.find(x => this.locator(x, id));
    }

    // saveScript(script: Script) {
    //     if (script.id == 0 || script.id == null) {
    //         script.id = this.generateID();
    //         this.scripts.push(script);
    //     } else {
    //         let index = this.scripts.findIndex(x => this.locator(x, script.id));
    //         this.scripts.splice(index, 1, script);
    //     }
    // }

    // deleteScript(id: number) {
    //     let index = this.scripts.findIndex(x => this.locator(x, id));
    //     if (index > -1) {
    //         this.scripts.splice(index, 1);
    //     }
    // }

    getActivities(): Activity[] {
        return this.activities;
    }
    
    getApprovedActivities(): Activity[] {
        return this.activities.filter(x => this.approved(x))
    }

    getApprovedVisibleActivities(): Activity[] {
        return this.getApprovedActivities().filter(x => x.script.visible)
    }

    getUnapprovedActivities(): Activity[] {
        return this.activities.filter(x => this.unapproved(x))
    }

    private generateThemeID(): number {
        let candidate = 1;
        while (this.getTheme(candidate) != null) {
            candidate++;
        }
        return candidate;
    }

}