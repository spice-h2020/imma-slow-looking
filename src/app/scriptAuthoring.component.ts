import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, multiquestionStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paScriptAuthoring",
    templateUrl: "scriptAuthoring.component.html"
}) 

export class ScriptAuthoringComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    showStageHelp = false;

    toggleStageHelp() {
        if(this.showStageHelp) {
            this.showStageHelp = false;
        }
        else {
            this.showStageHelp = true;
        }
    }

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    deleteStageConfirmationId = 0;

    confirmStageDelete(id:number) {
        this.deleteStageConfirmationId = id;
    }

    trackByIdx(index: number, obj: any): any {
        return index;
      }

    showArchivedScripts = false;

    showOpenScripts: boolean = true;

    showClosedScripts: boolean = true;

    viewScript: string = "0";

    editScriptDescription: string = "0";

    editScriptStage: number = 0;

    saveScript(script: Script) {
        if(script.artworkids == undefined) {
            script.artworkids = [];
        }
        this.model.saveScript(script);
    }

    stagesOfAScript(script: Script) {
        return script.stages.length;
    }

    addScript() {
        let newscript = new Script();
        newscript.name = "Untitled script";
        newscript.open = false;
        newscript.visible = true;
        newscript.archived = false;
        // newscript.artworkid = this.model.getDefaultArtworkId();
        // newscript.themeids = [this.model.getDefaultThemeId()];
        newscript.themeids = [];
        newscript.artworkids = [];
        newscript.stages = [];

        let userID = this.currentuser.getUserID();
        let user = this.currentuser.getUser();
        if (userID != 0) {
            newscript.owner = user._id;
            newscript.author = this.currentuser.getUser().username;
        }

        this.model.saveScript(newscript);
        this.editScriptDescription="0"; 
        this.editScriptStage=0;
    }

    addDefaultStagesToScript(script: Script) {
        script.stages = [this.addWelcomeStage(script, 1), this.addContextStage(script, 2), this.addQuestionStage(script, 3), 
            // this.addShareWithMuseumStage(script, 4), this.addFollowStage(script, 5), this.addShareWithSomeoneStage(script, 6), 
            this.addThankyouStage(script, 7)];
        this.model.saveScript(script);
    }

    getScript(_id: string) {
        return this.model.getScript(_id);
    }

    addWelcomeStage(script: Script, id?: number) {
        let stage = new welcomeStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addContextStage(script: Script, id?: number) {
        let stage = new contextStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }
    
    addQuestionStage(script: Script, id?: number) {
        let stage = new questionStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addMultiQuestionStage(script: Script, id?: number) {
        let stage = new multiquestionStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addShareWithMuseumStage(script: Script, id?: number) {
        let stage = new shareWithMuseumStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addFollowStage(script: Script, id?: number) {
        let stage = new followStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addShareWithSomeoneStage(script: Script, id?: number) {
        let stage = new shareWithSomeoneStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    addThankyouStage(script: Script, id?: number) {
        let stage = new thankyouStage();
        if(id != null && id != 0) {
            stage.id = id;
        }
        stage.id = this.model.saveStage(stage, script);
        return stage;
    }

    shiftStagePosition(script: Script, event, old) {
        //reorder script stages
        this.model.moveScriptStage(script, old, event.target.value);
    }

    themesChange(script: Script, themeid: string, selected: any) {
        if(selected.target.checked) {
            this.model.addThemeToScript(script, themeid);
        }
        else {
            this.model.removeThemeFromScript(script, themeid);
        }
        this.model.saveScript(script);
    }

    deleteStage(script: Script, stage: Stage) {
        this.model.removeStageFromScript(script, stage);
    }

    artworksChange(script: Script, artworkid: string, selected: any) {
        if(selected.target.checked) {
            this.model.addArtworkToScript(script, artworkid);
        }
        else {
            this.model.removeArtworkFromScript(script, artworkid);
        }
        this.model.saveScript(script);
    }

    getArtworks() {
        let artworks =  this.model.getArtworks();

        // filter artworks for login
        let filteredArtworks = this.filterArtworksForLogin(artworks);

        let sortedArtworks = filteredArtworks.sort((a, b) => (a.id > b.id) ? -1 : 1);

        return sortedArtworks;
    }

    filterArtworksForLogin(artworks: Artwork[]): Artwork[] {
        let userID = this.currentuser.getUserID();
        let user = this.currentuser.getUser();

        if (userID == 0) {
            return [];
        }

        let filteredArtworks = artworks.filter(x => x.owner == user._id);
        return filteredArtworks;
    }

    getArtworksFromIds(artworkIds: Array<string>): Array<Artwork> {
        let myartworks: Array<Artwork> = [];
        for(var artworkid of artworkIds) {
            let myartwork = this.getArtwork(artworkid);
            if(myartwork != undefined) {
                myartworks.push(myartwork);
            }
        }
        return myartworks;
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

    getThemes(): Theme[] {
        let themes = this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }

    getTheme(_id: string): Theme {
        return this.model.getTheme(_id);
    }

    addWelcomeStageToScript(script: Script) {
        let stage = this.addWelcomeStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addContextStageToScript(script: Script) {
        let stage = this.addContextStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addQuestionStageToScript(script: Script) {
        let stage = this.addQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addMultiQuestionStageToScript(script: Script) {
        let stage = this.addMultiQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addShareWithMuseumStageToScript(script: Script) {
        let stage = this.addShareWithMuseumStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addFollowStageToScript(script: Script) {
        let stage = this.addFollowStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addShareWithSomeoneStageToScript(script: Script) {
        let stage = this.addShareWithSomeoneStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    addThankyouStageToScript(script: Script) {
        let stage = this.addThankyouStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.editScriptStage = stage.id;
    }

    deleteScript(_id: string) {
        this.model.deleteScript(_id);
    }

    getThemesFromIds(themeIds: Array<string>) {
        let mythemes: Array<Theme> = [];
        for(var themeid of themeIds) {
            let mytheme = this.getTheme(themeid);
            if(mytheme != undefined) {
                mythemes.push(mytheme);
            }
        }
        return mythemes;
    }

    getArtworkFromId(artworkId: string) {
        if(artworkId == undefined) {
            return [];
        }
        else {
            return [this.getArtwork(artworkId)];
        }
    }

    getScripts(): Script[] {
        let scripts = this.model.getScripts();

        // filter scripts for login
        let filteredScripts = this.filterScriptsForLogin(scripts);

        let sortedScripts = filteredScripts.sort((a, b) => (a.id > b.id) ? -1 : 1);
        return sortedScripts;
    }

    filterScriptsForLogin(scripts: Script[]): Script[] {
        let userID = this.currentuser.getUserID();
        let user = this.currentuser.getUser();

        if (userID == 0) {
            return [];
        }

        // admin sees all scripts
        if(userID == 1) {
            return scripts;
        }

        let filteredScripts = scripts.filter(x => x.owner == user._id);
        return filteredScripts;
    }

    includeArtworksChange(script: Script, stage: Stage, artworkid: string, selected: any) {
        if(selected.target.checked) {
            //add artwork to included artworks
            this.model.addArtworkToIncludedArtworks(script, stage, artworkid);
        }
        else {
            //remove artwork from included artworks
            this.model.removeArtworkFromIncludedArtworks(script, stage, artworkid);
        }
        this.model.saveScript(script);
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != 0;
    }
    
}