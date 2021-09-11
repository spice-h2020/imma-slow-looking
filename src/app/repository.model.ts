import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { Theme } from "./theme.model";
import { Stage } from "./stage.model";
import { RestDataSource } from "./rest.datasource";
import { ComponentFactoryResolver, Injectable } from "@angular/core";

@Injectable()
export class Model {

    private locator = (x: any, id: number) => x.id == id;
    private themeLocator = (theme: Theme, id: string) => theme._id === id;
    private scriptLocator = (script: Script, id: string) => script._id == id;
    private activityLocator = (activity: Activity, id: string) => activity._id == id;
    private stringLocator = (x: any, id: any) => x._id == id;
    private openAndVisible = (x: any) => (x.open && x.visible);
    private visible = (x: any) => (x.visible);
    private approved = (x: any) => (x.approved);
    private unapproved = (x: any) => (!x.approved);
    private hasTheme = (x: any, _id: string) => x.themeids.find(e => e == _id);
    private hasTheme_id = (x: any, id: string) => x.themes.find(e => e._id === id);
    private dbArtworks: Artwork[] = new Array<Artwork>();
    private dbScripts: Script[] = new Array<Script>();
    private dbThemes: Theme[] = new Array<Theme>();
    private dbActivities: Activity[] = new Array<Activity>();

    constructor(private dbDataSource: RestDataSource) {

        this.dbDataSource.getThemeData().subscribe(data => this.dbThemes = data);
        this.dbDataSource.getArtworkData().subscribe(data => this.dbArtworks = data);
        this.dbDataSource.getActivityData().subscribe(data => this.dbActivities = data);
        this.dbDataSource.getScriptData().subscribe(data => this.dbScripts = data);

    }

    // Theme
    getThemes(): Theme[] {
        return this.dbThemes;
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
            this.dbDataSource.updateTheme(theme).subscribe(() => {
                let index = this.dbThemes.findIndex(item => this.themeLocator(item, theme._id));
                this.dbThemes.splice(index, 1, theme);
            });
        }
    }

    deleteTheme(_id: string) {
        let deletedTheme = this.getTheme(_id);
        
        this.dbDataSource.deleteTheme(_id).subscribe(() => {
            let index = this.dbThemes.findIndex(p => this.themeLocator(p, _id));
            if (index > -1) {
                this.dbThemes.splice(index, 1);
            }
        })
        //shift higher theme ids down
        for(var theme of this.dbThemes) {
            if(theme.id > deletedTheme.id) {
                theme.id = theme.id-1;
                this.saveTheme(theme);
            }
        }
    }

    deleteThemeFromScripts(_id: string, theme: Theme) {
        let scripts = this.getScriptsAllOfTheme(_id);
        scripts.forEach((script) => {
            this.removeThemeFromScript(script, theme._id);
          });
    }

    getScriptsAllOfTheme(_id: string): Script[] {
        return this.getScripts().filter(x => this.hasTheme_id(x, _id))
    }

    getDefaultThemeId() {
        return this.dbThemes[0]._id;
    }

    findIndexToUpdate(newItem: any) {
        return newItem._id === this;
    }

    updateThemePosition(theme: Theme, newPosition: number) {
        //if old position < new
        if(theme.id < newPosition) {
            for(var newTheme of this.dbThemes) {
                if(newTheme.id <= newPosition && newTheme.id > theme.id) {
                    let idnumber: number = +newTheme.id
                    newTheme.id = idnumber-1;
                    this.saveTheme(newTheme);
                }
            }
        }
        // if old position > new
        else if(theme.id > newPosition) {
            for(var newTheme of this.dbThemes) {
                if(newTheme.id >= newPosition && newTheme.id < theme.id) {
                    let idnumber: number = +newTheme.id
                    newTheme.id = idnumber+1;
                    this.saveTheme(newTheme);
                }
            }
        }
        //
        if(theme.id !== newPosition) {
            let idnumber: number = +newPosition
            theme.id = idnumber;
            this.saveTheme(theme);
        }
    }


    // Artwork
    getDefaultArtworkId() {
        return this.dbArtworks[0]._id;
    }

    getArtworks(): Artwork[] {
        return this.dbArtworks;
    }

    getArtwork(_id: string) {
        return this.dbArtworks.find(x => this.stringLocator(x, _id));
    }

    saveArtwork(artwork: Artwork) {
        if (artwork.id == 0 || artwork.id == null) {
            artwork.id = this.generateArtworkID();
        }
        if (artwork._id == undefined) {
            this.dbDataSource.saveArtwork(artwork).subscribe(p => {
                this.dbArtworks.push(p);
            });
        }
        else {
            this.dbDataSource.updateArtwork(artwork).subscribe(() => {
                let index = this.dbArtworks.findIndex(item => this.scriptLocator(item, artwork._id));
                this.dbArtworks.splice(index, 1, artwork);
            });
        }
    }

    deleteArtwork(_id: string) {
        this.dbDataSource.deleteArtwork(_id).subscribe(() => {
            let index = this.dbArtworks.findIndex(p => this.stringLocator(p, _id));
            if (index > -1) {
                this.dbArtworks.splice(index, 1);
            }
        })
    }

    // Script
    getScripts(): Script[] {
        return this.dbScripts;
    }

    getOpenVisibleScripts(): Script[] {
        return this.dbScripts.filter(x => this.openAndVisible(x));
    }

    getVisibleScripts(): Script[] {
        return this.dbScripts.filter(x => this.visible(x));
    }

    getVisibleScriptsOfTheme(_id: string): Script[] {
        return this.getVisibleScripts().filter(x => this.hasTheme(x, _id));
    }

    getScriptsOfTheme(_id: string): Script[] {
        return this.getOpenVisibleScripts().filter(x => this.hasTheme(x, _id));
    }

    getScript(_id: string): Script {
        return this.dbScripts.find(x => this.stringLocator(x, _id));
    }

    saveScript(script: Script) {
        if (script.id == 0 || script.id == null) {
            script.id = this.generateScriptID();
        }
        if (script._id == undefined) {
            this.dbDataSource.saveScript(script).subscribe(p => {
                this.dbScripts.push(p);
            });
        }
        else {
            this.dbDataSource.updateScript(script).subscribe(() => {
                let index = this.dbScripts.findIndex(item => this.scriptLocator(item, script._id));
                this.dbScripts.splice(index, 1, script);
            });
        }
    }

    deleteScript(_id: string) {
        this.dbDataSource.deleteScript(_id).subscribe(() => {
            let index = this.dbScripts.findIndex(p => this.stringLocator(p, _id));
            if (index > -1) {
                this.dbScripts.splice(index, 1);
            }
        })
    }

    addThemeToScript(script: Script, themeid: string) {
        //add theme
        script.themeids.push(themeid);
    }

    removeThemeFromScript(script: Script, themeid: string) {
        let index = script.themeids.findIndex(x => x == themeid);
        script.themeids.splice(index, 1);
    }

    saveStage(stage: Stage, script: Script) {
        if (stage.id == 0 || stage.id == null) {
            stage.id = this.generateScriptStageId(script);
        }
        return stage.id;
    }

    // Activity
    getActivity(id: number) {
        return this.dbActivities.find(x => this.locator(x, id));
    }

    getActivities(): Activity[] {
        return this.dbActivities;
    }
    
    getApprovedActivitiesOfAScript(scriptId: string): Activity[] {
        return this.getApprovedActivities().filter(x => x.script._id == scriptId);
    }

    getApprovedActivities(): Activity[] {
        return this.dbActivities.filter(x => this.approved(x));
    }

    getApprovedVisibleActivities(): Activity[] {
        return this.getApprovedActivities().filter(x => x.script.visible)
    }

    getUnapprovedActivities(): Activity[] {
        return this.dbActivities.filter(x => this.unapproved(x));
    }

    saveActivity(activity: Activity) {
        if(activity.id == 0 || activity.id == null) {
            activity.id = this.generateActivityID();
        }
        if (activity._id == undefined) {
            this.dbDataSource.saveActivity(activity).subscribe(p => this.dbActivities.push(p));
        } 
        else {
            this.dbDataSource.updateActivity(activity).subscribe(() => {
                let index = this.dbActivities.findIndex(item => this.activityLocator(item, activity._id));
                this.dbActivities.splice(index, 1, activity);
            });
        }
    }

    deleteActivity(_id: string) {
        this.dbDataSource.deleteActivity(_id).subscribe(() => {
            let index = this.dbActivities.findIndex(p => this.stringLocator(p, _id));
            if (index > -1) {
                this.dbActivities.splice(index, 1);
            }
        })
    }
    
    addStageToScript(script: Script, stage: Stage) {
        script.stages.unshift(stage);
        this.saveScript(script);
    }


    removeStageFromScript(script: Script, stage: Stage) {
 
        // remove stage
        let index = script.stages.findIndex(x => this.locator(x, stage.id));
        script.stages.splice(index, 1);

        // save script
        this.saveScript(script);
    }

    moveScriptStage(script: Script, oldPosition: number, newPosition: number) {
        //move script stage position
        this.insertAndShiftStages(script.stages, oldPosition, newPosition);
        //save script
        this.saveScript(script);
    }

    insertAndShiftStages(arr: Stage[], from: number, to: number) {
        let cutOut = arr.splice(from, 1) [0]; // cut the element at index 'from'
        arr.splice(to, 0, cutOut);            // insert it at index 'to'
    }

    // ID generators
    private generateActivityID(): number {
        let candidate = 1;
        while(this.dbActivities.find(element => element.id == candidate)) {
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

    generateScriptID(): number {
        let candidate = 1;
        while(this.dbScripts.find(element => element.id == candidate)) {
            candidate++;
        }
        return candidate;
    }

    private generateArtworkID(): number {
        let candidate = 1;
        while(this.dbArtworks.find(element => element.id == candidate)) {
            candidate++;
        }
        return candidate;
    }

    private getScriptStageFromId(script: Script, id: number) {
        return script.stages.find(s => s.id == id);
    }

    generateScriptStageId(script: Script) {
        let candidate = 1;
        if(script.stages.length == 0) {
            return candidate;
        }
        while (this.getScriptStageFromId(script, candidate) !== undefined) {
            candidate++;
        }
        return candidate;
    }

}