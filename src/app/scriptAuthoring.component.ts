import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paScriptAuthoring",
    templateUrl: "scriptAuthoring.component.html"
})

export class ScriptAuthoringComponent {

    model: Model = new Model();

    showOpenScripts: boolean = true;

    showClosedScripts: boolean = true;

    newScript: Script = new Script();

    viewScript: number = 0;

    editScriptDescription: number = 0;

    editScriptStage: number = 0;

    addScript() {
        let newscript = this.newScript;
        newscript.name = "Untitled script";
        newscript.open = false;
        newscript.visible = false;
        newscript.artwork = this.model.getDefaultArtwork();
        newscript.themes = [this.model.getDefaultTheme()];
        newscript.stages = [this.addWelcomeStage(), this.addContextStage(), this.addQuestionStage(), this.addShareWithMuseumStage(), this.addFollowStage(), this.addShareWithSomeoneStage(), this.addThankyouStage()];
        let scriptid = this.model.saveScript(newscript);
        this.viewScript = scriptid;
        this.editScriptDescription=0; 
        this.editScriptStage=0;
    }

    addWelcomeStage() {
        let stage = new welcomeStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    addContextStage() {
        let stage = new contextStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }
    
    addQuestionStage() {
        let stage = new questionStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    addShareWithMuseumStage() {
        let stage = new shareWithMuseumStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    addFollowStage() {
        let stage = new followStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    addShareWithSomeoneStage() {
        let stage = new shareWithSomeoneStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    addThankyouStage() {
        let stage = new thankyouStage();
        stage.id = this.model.saveStage(stage);
        return stage;
    }

    shiftStagePosition(script: Script, event, old) {
        //reorder script stages
        this.model.moveScriptStage(script, old, event.target.value);
    }

    themesChange(script: Script, theme: Theme, selected: any) {
        if(selected.target.checked) {
            this.model.addThemeToScript(script, theme);
        }
        else {
            this.model.removeThemeFromScript(script, theme);
        }
    }

    deleteStage(script: Script, stageid: number) {
        this.model.removeStageFromScript(script, stageid);
        this.model.deleteStage(stageid);
    }

    getArtworks(): Artwork[] {
        return this.model.getArtworks();
    }

    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    addWelcomeStageToScript(script: Script) {
        let stage = this.addWelcomeStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addContextStageToScript(script: Script) {
        let stage = this.addContextStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addQuestionStageToScript(script: Script) {
        let stage = this.addQuestionStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addShareWithMuseumStageToScript(script: Script) {
        let stage = this.addShareWithMuseumStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addFollowStageToScript(script: Script) {
        let stage = this.addFollowStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addShareWithSomeoneStageToScript(script: Script) {
        let stage = this.addShareWithSomeoneStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    addThankyouStageToScript(script: Script) {
        let stage = this.addThankyouStage();
        this.model.addStageToScript(script, stage);
        //set vars
        this.viewScript = script.id;
        this.editScriptStage = stage.id;
    }

    deleteScript(id: number) {
        this.model.deleteScript(id);
    }

    getScripts(): Script[] {
        return this.model.getScripts();
    }

}