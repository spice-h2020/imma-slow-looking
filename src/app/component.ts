import { Component } from "@angular/core";
import { isArray } from "util";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction } from "./action.model";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { contextStage, followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";

@Component({
    selector: 'app',
    templateUrl: './template.html'
})
export class SlowLookingComponent {

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

    deleteStage(script: Script, stageid: number) {
        this.model.removeStageFromScript(script, stageid);
        this.model.deleteStage(stageid);
    }

    newScript: Script = new Script();

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

    deleteScript(id: number) {
        this.model.deleteScript(id);
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

    viewScript: number = 0;

    editScriptDescription: number = 0;

    editScriptStage: number = 0;

    showOpenScripts: boolean = true;

    showClosedScripts: boolean = true;

    scriptShow: number = 0;

    shiftThemePosition(event,old){
        this.model.shiftThemePosition(old, event.target.value);
    }

    selectScript(id: number) {
        if(id == this.selectedScript) {
            this.selectedScript = 0;
        }
        else {
            this.selectedScript = id;
        }
    }
    
    toggleQuestionHelp() {
        if(this.showQuestionHelp) {
            this.showQuestionHelp = false;
        }
        else {
            this.showQuestionHelp = true;
        }
    }
    showQuestionHelp = false;

    selectedScript: number = 0;

    model: Model = new Model();
    
    mode: number = 1;

    managementMode: number = 1;

    // slowLookingTheme: number = 0;

    otherPeopleTheme: number = 0;

    slowLookingScript: number = 0;

    slowLookingCurrentScriptStageIndex = 0;

    slowLookingMaximumScriptStageIndex = 0;

    setSlowLookingScript(id: number) {
        // get the script
        var SLscript = this.getScript(id);

        // set script id
        this.slowLookingScript = id;
        // set current stage index to zero
        this.slowLookingCurrentScriptStageIndex = 0;
        // set maximum stage index to length -1
        this.slowLookingMaximumScriptStageIndex = SLscript.stages.length-1;

        // initialize activity of the script
        this.newActivity = new Activity();
        this.newActivity.script = SLscript;
        this.newActivity.approved = false;
    }

    // updateSlowLookingTheme(id: number) {
    //     if(id == this.slowLookingTheme) {
    //         this.slowLookingTheme = 0;
    //     }
    //     else {
    //         this.slowLookingTheme = id;
    //     }
    // }

    updateOtherPeopleTheme(id: number) {
        if(id == this.otherPeopleTheme) {
            this.otherPeopleTheme = 0;
        }
        else {
            this.otherPeopleTheme = id;
        }
    }

    newActivity: Activity = new Activity();

    newQuestionAction: questionAction = new questionAction();

    newShareWithMusemAction: shareWithMusemAction = new shareWithMusemAction();

    newFollowAction: followAction = new followAction();

    newShareWithFriendAction: shareWithFriendAction = new shareWithFriendAction();

    editrow: number = 0;

    tableEditing: boolean = false;

    newTheme: Theme = new Theme();

    intialiseShareWithSomeoneAction(stage: shareWithSomeoneStage) {
        this.newShareWithFriendAction.shareWithOtherStage = stage;
    }

    intialiseFollowAction(stage: followStage) {
        this.newFollowAction.followStage = stage;
    }

    intialiseQuestionAction(stage: questionStage, question: string) {
        this.newQuestionAction.questionStage = stage;
        this.newQuestionAction.question = question;
    }

    intialiseShareWithMuseumAction(stage: shareWithMuseumStage) {
        this.newShareWithMusemAction.shareWithMuseumStage = stage;
    }
    
    addActivity() {
        this.model.saveActivity(this.newActivity);
    }

    deleteActivity(id: number) {
        this.model.deleteActivity(id);
    }

    addActionToActivity(action: Action) {
        if(this.newActivity.actions) {
            this.newActivity.actions.push(action);
        }
        else{
            this.newActivity.actions = new Array(action);
        }
    }

    resetShareWithSomeoneAction() {
        this.newShareWithFriendAction = new shareWithFriendAction();
    }

    resetFollowAction() {
        this.newFollowAction = new followAction();
    }

    resetNewQuestionAction() {
        this.newQuestionAction = new questionAction();
    }

    resetNewShareWithMusemAction() {
        this.newShareWithMusemAction = new shareWithMusemAction();
    }

    addTheme(theme: Theme) {
        this.model.saveTheme(theme);
        this.newTheme = new Theme();
        this.tableEditing = false;
    }

    deleteTheme(id: number) {
        //delete theme from scripts
        let theme = this.getTheme(id);
        this.model.deleteThemeFromScripts(id, theme);

        //delete theme from theme list
        this.model.deleteTheme(id);
        this.tableEditing = false;
    }

    getArtworks(): Artwork[] {
        return this.model.getArtworks();
    }

    getThemes(): Theme[] {
        return this.model.getThemes();
    }

    getTheme(id: number): Theme {
        return this.model.getTheme(id);
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

    getApprovedActivitiesOfAScript(id: number): Activity[] {
        return this.model.getApprovedActivitiesOfAScript(id);
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