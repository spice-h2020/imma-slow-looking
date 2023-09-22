import { Component, OnInit } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { ScriptSet } from "./scriptSet.model";
import { Script } from "./script.model";
import { ConfigSettings } from "./config";

@Component({
    selector: "paSelectorTable",
    templateUrl: "selectorTable.component.html"
})

export class SelectorTableComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    configSettings = new ConfigSettings;

    showup() {
        window.scroll(0,0);
    }

    getCurrentUserID() {
        return this.currentuser.getUserID();
    }

    getCurrentUsername() {
        let user = this.currentuser.getUser();
        if(user.username != undefined) {
            return user.username;
        }
    }

    isLoggedOut() {
        return this.currentuser.getUserID() == undefined;
    }

    selectedscriptset() {
        return this.model.selectedscriptset;
    }

    selectedscriptsetname() {
        let scriptset =  this.model.selectedscriptset;
        if(scriptset) {
            if(typeof scriptset.name !== undefined) {
                return scriptset.name;
            }
            else {
                return "";
            }
        }
    }

    unselectscriptset() {
        this.model.selectedscriptset = null;
    }

    selectscriptset(_id: string) {
        this.model.selectedscriptset = this.getscriptset(_id);
    }

    addscriptset() {
        let newSelector = new ScriptSet;
        newSelector.name = "Untitled";

        let user = this.currentuser.getUser();
        newSelector.owner = user._id;
        this.model.saveScriptSet(newSelector);
    }

    savescriptset(scriptset: ScriptSet) {
        this.model.saveScriptSet(scriptset);
    }

    getscriptsets() {
        let scriptsets = this.model.getScriptSets();

        let filteredscriptsets = this.filterScriptSetsForLogin(scriptsets);

        return filteredscriptsets;
    }

    getscriptset(_id: string): ScriptSet {
        return this.model.getScriptSet(_id);
    }

    filterScriptSetsForLogin(scriptsets: ScriptSet[]): ScriptSet[] {
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == undefined) {
            return [];
        }

        let filteredscriptsets = scriptsets.filter(x => x.owner == user._id);
        return filteredscriptsets;
    }

    deleteConfirmation_Id: string = null;

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    deletescriptset(_id: string) {
        this.model.deleteScriptSet(_id);
    }

    getScripts(): Script[] {
        let scripts = this.model.getScripts();

        // filter scripts for login
        let filteredScripts = this.filterScriptsForLogin(scripts);

        //filter scripts that are not removed and have at least one stage
        let filteredScripts2 = filteredScripts.filter(x => !x.removed && x.stages.length);

        return filteredScripts2;
    }

    filterScriptsForLogin(scripts: Script[]): Script[] {
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == undefined) {
            return [];
        }

        if(user._id != undefined) {
            let filteredScripts = scripts.filter(x => x.owner == user._id);
            return filteredScripts;
        }
        else {
            return [];
        }
    }

    scriptsChange(scriptid: string, selected: any) {
        if(selected.target.checked) {
            this.addScriptToScriptset(scriptid);
        }
        else {
            this.removeScriptFromScriptset(scriptid);
        }
    }

    addScriptToScriptset(scriptid: string) {
        //add theme
        this.selectedscriptset().scriptids.push(scriptid);
    }

    removeScriptFromScriptset(scriptid: string) {
        let index = this.selectedscriptset().scriptids.findIndex(x => x == scriptid);
        if(index > -1) {
            this.selectedscriptset().scriptids.splice(index, 1);
        }
    }

    getScript(_id: string) {
        return this.model.getScript(_id);
    }

    getScriptName(_id: string) {
        let script = this.model.getScript(_id);
        if(script) {
            if(typeof script.name !== undefined) {
                return script.name;
            }
            else {
                return "";
            }
        }
    }

    scriptsetURL(scriptset: Script): string {
        return this.configSettings.baseURL + "select/" + scriptset._id;
    }

}
