import { Component, OnInit } from "@angular/core";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction, multiquestionAction, questionanswer } from "./action.model";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Artwork } from "./artwork.model";
import { followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, multiquestionStage } from "./stage.model";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";

@Component({
    selector: "paSlowLookingActivity",
    templateUrl: "slowLookingActivity.component.html"
})

export class SlowLookingActivityComponent implements OnInit {

    multiquestionIndex = 0;

    incrementMultiquestionIndex(len: number) {
        if(this.multiquestionIndex <= len) {
            this.multiquestionIndex = this.multiquestionIndex + 1;
        }
    }

    decrementMultiquestionIndex() {
        if(this.multiquestionIndex >= 0) {
            this.multiquestionIndex = this.multiquestionIndex - 1;
        }
    }

    //current script _id retrieved from route
    slowLookingScript = "0";

    // index of final stage of current script
    slowLookingMaximumScriptStageIndex = 0;

    // current script stage
    slowLookingCurrentScriptStageIndex = 0;

    // new activity initialised on init
    newActivity: Activity = new Activity();

    constructor(
        private activatedRoute: ActivatedRoute,
        private model: Model
      ) { } 

    ngOnInit() {
        let _id = this.activatedRoute.snapshot.params.id;

        // get the script
        let SLscript = this.getScript(_id);

        // set script id
        this.slowLookingScript = _id;

        // set current stage index to zero
        this.slowLookingCurrentScriptStageIndex = 0;  

        // set maximum stage index to length -1
        this.slowLookingMaximumScriptStageIndex = SLscript.stages.length-1;

        // initialize activity of the script
        this.newActivity = new Activity();
        this.newActivity.script = SLscript;
        this.newActivity.approved = true;

        // this.setSlowLookingScript(this.slowLookingScript);
    }

    answerChanged(event) {
        this.submittedAnswer = false;
    }
    // setSlowLookingScript(_id: string) {
    //     // get the script
    //     let SLscript = this.getScript(_id);
    //     // set script id
    //     this.slowLookingScript = _id;

    //     // set current stage index to zero
    //     this.slowLookingCurrentScriptStageIndex = 0;

    //     // set maximum stage index to length -1
    //     this.slowLookingMaximumScriptStageIndex = SLscript.stages.length-1;

    //     // initialize activity of the script
    //     this.newActivity = new Activity();
    //     this.newActivity.script = SLscript;
    //     this.newActivity.approved = false;

    // }

    randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

    randomiseQuestion(len:number) {
        len = len-1;
        let rand = this.randomInt(0, len);
        if(rand >= this.multiquestionIndex) {
            rand=rand+1;
        }
        this.multiquestionIndex = rand;
        this.setAnswerValue(rand);
    }
    submittedAnswer = false;
    resetAnswerValue() {
        this.answervalue = new FormControl();
    }
    answervalue = new FormControl();
    setAnswerValue(index: number) {
        if(this.newMultiquestionAction.answers == undefined) {
            this.newMultiquestionAction.answers = [];
        }
        let qa = this.newMultiquestionAction.answers.find(x => x.question == index)
        if(qa) {
            this.answervalue.setValue(qa.answer);
        }
        else {
            this.answervalue.setValue("");
        }
    };

    myanswertext = "";

    getCurrentAnswer(index: number) {
        let answer = this.newMultiquestionAction.answers.find(x => x.question == index);
        if (answer == undefined) {
            return "";
        }
        else {
            return answer.answer;
        }
    }

    updateAnswers(index: number, value: string) {
        let nqa = new questionanswer(index, value);
        if(this.newMultiquestionAction.answers == undefined) {
            this.newMultiquestionAction.answers = [];
        }

        let newarray = this.newMultiquestionAction.answers.filter(answer => answer.question != index)
        newarray.push(nqa);
        this.newMultiquestionAction.answers = newarray;
    }

    myanswers: Array<questionanswer> = [];

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

    intialiseMultiquestionAction(stage: multiquestionStage, questions: Array<string>) {
        this.newMultiquestionAction.questionStage = stage;
        this.newMultiquestionAction.questions = questions;
    }

    intialiseShareWithMuseumAction(stage: shareWithMuseumStage) {
        this.newShareWithMusemAction.shareWithMuseumStage = stage;
    }
    
    newQuestionAction: questionAction = new questionAction();

    newMultiquestionAction: multiquestionAction = new multiquestionAction();

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

    resetNewMultiQuestionAction() {
        this.newMultiquestionAction = new multiquestionAction();
    }

    resetNewShareWithMusemAction() {
        this.newShareWithMusemAction = new shareWithMusemAction();
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

}