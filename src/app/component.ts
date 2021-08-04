import { Component } from "@angular/core";
import { isArray } from "util";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction } from "./action.model";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage } from "./stage.model";
import { Theme } from "./theme.model";

@Component({
    selector: 'app',
    templateUrl: './template.html'
})
export class SlowLookingComponent {

    foo(x){
        console.log(x);
    }

    model: Model = new Model();
    
    mode: number = 2;

    managementMode: number = 1;

    slowLookingTheme: number = 0;

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

    updateSlowLookingTheme(id: number) {
        if(id == this.slowLookingTheme) {
            this.slowLookingTheme = 0;
        }
        else {
            this.slowLookingTheme = id;
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
        console.log("hello");
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
        this.model.deleteTheme(id);
        this.newTheme = new Theme();
        this.tableEditing = false;
    }

    getArtworks(): Artwork[] {
        return this.model.getArtworks();
    }

    getThemes(): Theme[] {
        return this.model.getThemes();
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