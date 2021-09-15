import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";

@Component({
    selector: "paScriptAuthoring",
    templateUrl: "scriptAuthoring.component.html"
})

export class ScriptAuthoringComponent {

    constructor(private model: Model){}

    showOpenScripts: boolean = true;

    showClosedScripts: boolean = true;

    viewScript: string = "0";

    editScriptDescription: string = "0";

    editScriptStage: number = 0;

    saveScript(script: Script) {
        this.model.saveScript(script);
    }
    stagesOfAScript(script: Script) {
        return script.stages.length;
    }

    addScript() {
        let newscript = new Script();
        newscript.name = "Untitled script";
        newscript.open = false;
        newscript.visible = false;
        newscript.artworkid = this.model.getDefaultArtworkId();
        newscript.themeids = [this.model.getDefaultThemeId()];
        newscript.stages = [];
        this.model.saveScript(newscript);
        this.editScriptDescription="0"; 
        this.editScriptStage=0;
    }

    addDefaultStagesToScript(script: Script) {
        script.stages = [this.addWelcomeStage(script, 1), this.addContextStage(script, 2), this.addQuestionStage(script, 3), this.addShareWithMuseumStage(script, 4), this.addFollowStage(script, 5), this.addShareWithSomeoneStage(script, 6), this.addThankyouStage(script, 7)];
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

    getArtworks(): Artwork[] {
        return this.model.getArtworks();
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

    getThemes(): Theme[] {
        return this.model.getThemes();
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
        return [this.getArtwork(artworkId)];
    }

    getScripts(): Script[] {
        let scripts = this.model.getScripts();
        let sortedScripts = scripts.sort((a, b) => (a.id > b.id) ? -1 : 1);
        return sortedScripts;
    }

}