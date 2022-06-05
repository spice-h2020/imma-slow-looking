import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, multiquestionStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, statementStage, storyStage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";
import { User } from "./user.model";

@Component({
    selector: "paScriptAuthoring",
    templateUrl: "scriptAuthoring.component.html"
}) 

export class ScriptAuthoringComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    currentUser: number = 1;

    showallscripts: boolean = false;

    showStageHelp = false;

    newStageMessage: boolean = false;

    newStageMessageText: string = "New stage added to the end of your script";

    //URL for accessing the script directly
    scriptURL(script: Script): string {
        return location.origin.concat("/slowLooking/", script._id);
    }

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

        let user = this.currentuser.getUser();
        let userID = user.id;
        if (userID != undefined) {
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
    
    addStatementStage(script: Script, id?: number) {
        let stage = new statementStage();
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

    addStoryStage(script: Script, id?: number) {
        let stage = new storyStage();
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
            
            //remove artwork from script stages
            for(var stage of script.stages) {
                this.model.removeArtworkFromIncludedArtworks(script, stage, artworkid);
            }
        }
        this.model.saveScript(script);
    }

    getArtworks(script: Script) {
        let artworks =  this.model.getArtworks();

        // filter artworks for login
        let filteredArtworks = this.filterArtworksForScriptOwner(artworks, script);

        let sortedArtworks = filteredArtworks.sort((a, b) => (a.artist < b.artist) ? -1 : 1);

        return sortedArtworks;
    }

    filterArtworksForScriptOwner(artworks: Artwork[], script: Script): Artwork[] {

        if (script.owner == undefined) {
            return [];
        }

        let filteredArtworks = artworks.filter(x => x.owner == script.owner);
        return filteredArtworks;
    }

    getArtworksFromIds(name: string, artworkIds: Array<string>, script: Script, stage?: Stage): Array<Artwork> {
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
        let artwork = this.model.getArtwork(_id);
        return artwork;
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
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addContextStageToScript(script: Script) {
        let stage = this.addContextStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addStatementStageToScript(script: Script) {
        let stage = this.addStatementStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessageText = "New statement stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addQuestionStageToScript(script: Script) {
        let stage = this.addQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessageText = "New question stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addStoryStageToScript(script: Script) {
        let stage = this.addStoryStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessageText = "New story stage added to the end of your script";
        this.newStageMessage = true;
        // this.editScriptStage = stage.id;
    }

    addMultiQuestionStageToScript(script: Script) {
        let stage = this.addMultiQuestionStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessageText = "New multiquestion stage added to the end of your script";
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
    }

    addShareWithMuseumStageToScript(script: Script) {
        let stage = this.addShareWithMuseumStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
    }

    addFollowStageToScript(script: Script) {
        let stage = this.addFollowStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
    }

    addShareWithSomeoneStageToScript(script: Script) {
        let stage = this.addShareWithSomeoneStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
    }

    addThankyouStageToScript(script: Script) {
        let stage = this.addThankyouStage(script);
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script._id;
        this.newStageMessage = true;
        //this.editScriptStage = stage.id;
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
            let artwork = this.getArtwork(artworkId);
            if(artwork == undefined) {
                return []
            }
            return [artwork];
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
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == undefined) {
            return [];
        }

        //admin sees all scripts
        if(userID == 1) {
            if(this.showallscripts) {
                return scripts;
            }
            else {
                let editorID = this.get_IDOfUserID(this.currentUser);
                if(editorID != undefined) {
                    let filteredScripts = scripts.filter(x => x.owner == editorID);
                    return filteredScripts;
                }
                else {
                    let filteredScripts: Array<Script> = [];
                    return filteredScripts;
                }
            }
        }

        let filteredScripts = scripts.filter(x => x.owner == user._id);
        return filteredScripts;
    }

    get_IDOfUserID(currentUser: number) {
        let myuser = this.getUsers().find(user => user.id == currentUser);
        if(myuser != undefined) {
            return myuser._id;
        }
        else {
            return undefined;
        }
    }

    getUsers(): User[] {
        return this.model.getUsers().sort((a, b) => (a.id < b.id) ? -1 : 1);;
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
        return this.currentuser.getUserID() != undefined;
    }
    
    drop(event: CdkDragDrop<string[]>, script: Script, i: number) {
        if(script.stages[i] as multiquestionStage && script.stages[i].hasOwnProperty, 'body') {
            moveItemInArray(script.stages[i].body, event.previousIndex, event.currentIndex);
            this.saveScript(script);
        }
    }

    deleteMultistageQuestion(script: Script, stageNumber: number, questionNumber: number) {
        if(script.stages[stageNumber] as multiquestionStage && script.stages[stageNumber].hasOwnProperty, 'body') {
            script.stages[stageNumber].body.splice(questionNumber, 1);
            this.saveScript(script);
        }
    }

    stageDrop(script: Script, event: CdkDragDrop<string[]>) {
        this.model.moveScriptStage(script, event.previousIndex, event.currentIndex);
    }

    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }
}