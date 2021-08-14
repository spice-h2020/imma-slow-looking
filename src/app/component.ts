import { Component } from "@angular/core";
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

    // remove

    // remove
    
    getThemes(): Theme[] {
        return this.model.getThemes();
    }

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

    getTheme(id: number): Theme {
        return this.model.getTheme(id);
    }

    getOpenVisibleScripts(): Script[] {
        return this.model.getOpenVisibleScripts();
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

}