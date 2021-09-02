import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { StaticDataSource } from "./datasource.model";
import { Theme } from "./theme.model";
import { Stage } from "./stage.model";
import { Observable } from "rxjs"; 
import { RestDataSource } from "./rest.datasource";
import { Injectable } from "@angular/core";

@Injectable()
export class Model {
    private dataSource: StaticDataSource;
    private themes: Theme[];
    private artworks: Artwork[];
    private scripts: Script[];
    private activities: Activity[];
    private stages: Stage[];
    private locator = (x: any, id: number) => x.id == id;
    private themeLocator = (theme: Theme, id: string) => theme._id == id;
    private locator2 = (x: any, id: any) => x._id == id;
    private stringLocator = (x: any, id: any) => x._id == id;
    private openAndVisible = (x: any) => (x.open && x.visible);
    private approved = (x: any) => (x.approved);
    private unapproved = (x: any) => (!x.approved);
    private hasTheme = (x: any, id: number) => x.themes.find(e => e.id == id);
    private hasTheme_id = (x: any, id: string) => x.themes.find(e => e._id === id);
    private dbArtworks: Artwork[] = new Array<Artwork>();
    private dbScripts: Script[] = new Array<Script>();
    private dbStages: Stage[] = new Array<Stage>();
    private dbThemes: Theme[] = new Array<Theme>();
    private dbActivities: Activity[] = new Array<Activity>();

    constructor(private dbDataSource: RestDataSource) {

        this.dbDataSource.getThemeData().subscribe(data => this.dbThemes = data);
        this.dbDataSource.getArtworkData().subscribe(data => this.dbArtworks = data);
        this.dbDataSource.getActivityData().subscribe(data => this.dbActivities = data);
        this.dbDataSource.getScriptData().subscribe(data => this.dbScripts = data);
        this.dbDataSource.getStageData().subscribe(data => this.dbStages = data);

        
        // this.dataSource = new StaticDataSource;

        // this.themes = new Array<Theme>();
        // this.dataSource.getThemeData().forEach(x => this.themes.push(x));

        // this.artworks = new Array<Artwork>();
        // this.dataSource.getArtworkData().forEach(x => this.artworks.push(x));

        // this.scripts = new Array<Script>();
        // this.dataSource.getScriptData().forEach(x => this.scripts.push(x));

        // this.activities = new Array<Activity>();
        // this.dataSource.getActivityData().forEach(x => this.activities.push(x));

        // this.stages = new Array<Stage>();
        // this.dataSource.getStageData().forEach(x => this.stages.push(x));

    }

    // Theme
    getThemes(): Theme[] {
        return this.dbThemes;
        // return this.themes;
    }

    getTheme(_id: string) {
        return this.dbThemes.find(x => this.stringLocator(x, _id));
    }

    saveTheme(theme: Theme) {
        if(theme.id == 0 || theme.id == null) {
            theme.id = this.generateThemeID();
        }
        if (theme._id == undefined) {
            this.dbDataSource.saveTheme(theme).subscribe(p => this.dbThemes.push(p));
        } 
        else {
            this.dbDataSource.updateTheme(theme).subscribe(p => {
                let index = this.dbThemes.findIndex(item => this.themeLocator(item, p._id));
                this.dbThemes.splice(index, 1, p);
        });
        }
    }

    deleteTheme(_id: string) {
        let deletedTheme = this.getTheme(_id);
        
        this.dbDataSource.deleteTheme(_id).subscribe(() => {
            let index = this.dbThemes.findIndex(p => this.stringLocator(p, _id));
            if (index > -1) {
                this.dbThemes.splice(index, 1);
            }
        })
        //shift higher theme ids down
        for(var item of this.dbThemes) {
            if(item.id > deletedTheme.id) {
                item.id = item.id-1;
                this.saveTheme(item);
            }
        }
    }

    deleteThemeFromScripts(_id: string, theme: Theme) {
        let scripts = this.getScriptsAllOfTheme(_id);
        scripts.forEach((script) => {
            this.removeThemeFromScript(script, theme);
          });
    }

    getScriptsAllOfTheme(_id: string): Script[] {
        return this.getScripts().filter(x => this.hasTheme_id(x, _id))
    }




    moveScriptStage(script: Script, oldPosition: number, newPosition: number) {
        //move script stage position
        this.insertAndShiftStages(script.stages, oldPosition, newPosition);
        //save script
        this.saveScript(script);
    }

    addThemeToScript(script: Script, theme: Theme) {
        //add theme
        script.themes.push(theme);

        //save script
        this.saveScript(script);
    }
    
    addStageToScript(script: Script, stage: Stage) {
        script.stages.unshift(stage);
        this.saveScript(script);
    }

    removeStageFromScript(script: Script, stageid: number) {
 
        // remove stage
        let index = script.stages.findIndex(x => this.locator(x, stageid));
        script.stages.splice(index, 1);

        // save script
        this.saveScript(script);
    }

    removeThemeFromScript(script: Script, theme: Theme) {

        //remove theme
        let index = script.themes.findIndex(x => this.locator(x, theme.id));
        script.themes.splice(index, 1);

        //save script
        this.saveScript(script);
    }

    shiftThemePosition(from: number, to: number) {
        this.insertAndShiftThemes(this.dbThemes, from, to);
        // let myid = 1;
        // this.dbThemes.forEach(theme => {
        //     theme.id = myid;
        //     this.saveTheme(theme);
        //     myid = myid+1;
        // });
    }
    
    updateThemePosition(theme: Theme, newPosition: number) {
        //if old position < new
        // if(theme.id < newPosition) {
        //     for(var item of this.dbThemes) {
        //         if(item.id <= newPosition && item.id > theme.id) {
        //             item.id = item.id-1;
        //             this.saveTheme(item);
        //         }
        //     }
        // }
        // if old position > new
        // else if(theme.id > newPosition) {
        //     for(var item of this.dbThemes) {
        //         if(item.id >= newPosition && item.id < theme.id) {
        //             item.id = item.id+1;
        //             this.saveTheme(item);
        //         }
        //     }
        // }
        //if both positions are the same then no shifting needed
        if(theme.id !== newPosition) {
            theme.id = 5;//newPosition;
            this.saveTheme(theme);
        }
    }

    insertAndShiftStages(arr: Stage[], from: number, to: number) {
        let cutOut = arr.splice(from, 1) [0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
    }

    insertAndShiftThemes(arr: Theme[], from: number, to: number) {
        let cutOut = arr.splice(from, 1) [0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
    }

    getStages(): Stage[] {
        return this.dbStages;
        // return this.stages;
    }

    getStage(id: number) {
        return this.stages.find(x => this.locator(x, id));
    }

    saveStage(stage: Stage) {
        if (stage.id == 0 || stage.id == null) {
            stage.id = this.generateStageID();
            this.stages.push(stage);
        } else {
            let index = this.stages.findIndex(x => this.locator(x, stage.id));
            this.stages.splice(index, 1, stage);
        }
        return stage.id;
    }

    deleteStage(id: number) {
        let index = this.stages.findIndex(x => this.locator(x, id));
        if (index > -1) {
            this.stages.splice(index, 1);
        }
    }

    saveActivity(activity: Activity) {
        activity.id = this.generateActivityID();
        this.activities.push(activity);
    }

    deleteActivity(id: number) {
        let index = this.activities.findIndex(x => this.locator(x, id));
        if (index > -1) {
            this.activities.splice(index, 1);
        }
    }

    getDefaultTheme() {
        return this.dbThemes[0];
        //return this.themes[0];
    }

    getDefaultArtwork() {
        return this.dbArtworks[0];
        //return this.artworks[0];
    }

    getArtworks(): Artwork[] {
        return this.dbArtworks;
        // return this.artworks;
    }

    getScripts(): Script[] {
        return this.dbScripts;
        // return this.scripts;
    }

    getOpenVisibleScripts(): Script[] {
        return this.dbScripts.filter(x => this.openAndVisible(x))
    }

    getScriptsOfTheme(id: number): Script[] {
        return this.getOpenVisibleScripts().filter(x => this.hasTheme(x, id))
    }

    getScript(id: number): Script {
        return this.scripts.find(x => this.locator(x, id));
    }

    saveScript(script: Script) {
        if (script.id == 0 || script.id == null) {
            script.id = this.generateScriptID();
            this.scripts.push(script);
        } else {
            let index = this.scripts.findIndex(x => this.locator(x, script.id));
            this.scripts.splice(index, 1, script);
        }
        return script.id;
    }

    deleteScript(id: number) {
        let index = this.scripts.findIndex(x => this.locator(x, id));
        if (index > -1) {
            this.scripts.splice(index, 1);
        }
    }

    getActivity(id: number) {
        return this.dbActivities.find(x => this.locator(x, id));
        // return this.activities.find(x => this.locator(x, id));
    }

    getActivities(): Activity[] {
        return this.dbActivities;
        // return this.activities;
    }
    
    getApprovedActivitiesOfAScript(scriptId: number): Activity[] {
        return this.getApprovedActivities().filter(x => x.script.id == scriptId);
    }

    getApprovedActivities(): Activity[] {
        return this.dbActivities.filter(x => this.approved(x))
        // return this.activities.filter(x => this.approved(x))
    }

    getApprovedVisibleActivities(): Activity[] {
        return this.getApprovedActivities().filter(x => x.script.visible)
    }

    getUnapprovedActivities(): Activity[] {
        return this.dbActivities.filter(x => this.unapproved(x))
        // return this.activities.filter(x => this.unapproved(x))
    }

    private generateActivityID(): number {
        let candidate = 1;
        while (this.getActivity(candidate) != null) {
            candidate++;
        }
        return candidate;
    }

    private generateThemeID(): number {
        let candidate = 1;
        while(this.dbThemes.find(element => element.id == candidate)) {
            candidate++;
        }
        return candidate;
    }

    private generateScriptID(): number {
        let candidate = 1;
        while (this.getScript(candidate) != null) {
            candidate++;
        }
        return candidate;
    }

    private generateStageID(): number {
        let candidate = 1;
        while (this.getStage(candidate) != null) {
            candidate++;
        }
        return candidate;
    }
}