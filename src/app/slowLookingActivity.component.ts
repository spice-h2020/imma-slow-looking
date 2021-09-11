import { Component } from "@angular/core";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction } from "./action.model";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage } from "./stage.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "paSlowLookingActivity",
    templateUrl: "slowLookingActivity.component.html"
})

export class SlowLookingActivityComponent {

    slowLookingScript = "0";

    slowLookingMaximumScriptStageIndex = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private model: Model
      ) { }

    ngOnInit(): void {
        this.slowLookingScript = this.activatedRoute.snapshot.params.id;
        this.setSlowLookingScript(this.slowLookingScript);
    }

    setSlowLookingScript(_id: string) {

        // get the script
        var SLscript = this.getScript(_id);

        // set script id
        this.slowLookingScript = _id;

        // set current stage index to zero
        this.slowLookingCurrentScriptStageIndex = 0;
        // set maximum stage index to length -1
        this.slowLookingMaximumScriptStageIndex = SLscript.stages.length-1;

        // initialize activity of the script
        this.newActivity = new Activity();
        this.newActivity.script = SLscript;
        this.newActivity.approved = false;
    }

    // slowLookingScript: number = 1;

    slowLookingCurrentScriptStageIndex = 0;

    newActivity: Activity = new Activity();

    getScript(_id: string): Script {
        return this.model.getScript(_id);
    }

    showQuestionHelp = false;

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
    
    newQuestionAction: questionAction = new questionAction();

    newShareWithMusemAction: shareWithMusemAction = new shareWithMusemAction();

    newFollowAction: followAction = new followAction();

    newShareWithFriendAction: shareWithFriendAction = new shareWithFriendAction();

    toggleQuestionHelp() {
        if(this.showQuestionHelp) {
            this.showQuestionHelp = false;
        }
        else {
            this.showQuestionHelp = true;
        }
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

}