import { Component, OnInit } from "@angular/core";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction, multiquestionAction, questionanswer, storyAction } from "./action.model";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Artwork } from "./artwork.model";
import { followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, multiquestionStage, Stage } from "./stage.model";
import { ActivatedRoute } from "@angular/router";
import { UntypedFormControl } from "@angular/forms";
import { CurrentUser } from "./currentUser.service";
import { Gallery, GalleryItem, GalleryRef, ImageItem } from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
import { Question } from "./question.model";
import { findIndex } from "rxjs/operators";


@Component({
    selector: "paSlowLookingActivity",
    templateUrl: "slowLookingActivity.component.html"
})

export class SlowLookingActivityComponent implements OnInit {

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    showup() {
        window.scroll(0,0);
    }

    remainingMultiquestions: number[] = [];

    multiquestionIndex = 0;

    routerLink = "/home";

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

    currentScript: Script;

    currentScriptImages: GalleryItem[] = [];

    scriptfound: boolean;

    lightboxGalleryRef: GalleryRef;

    // index of final stage of current script
    slowLookingMaximumScriptStageIndex = 0;

    // current script stage
    slowLookingCurrentScriptStageIndex = 0;

    // new activity initialised on init
    newActivity: Activity = new Activity();

    constructor(
        public currentuser: CurrentUser, 
        private activatedRoute: ActivatedRoute,
        private model: Model,
        public gallery: Gallery,
        public lightbox: Lightbox
    ) { } 

    ngOnInit() {

        let _id = this.activatedRoute.snapshot.params.id;
        
        //return to gallery rather than home page
        this.activatedRoute.queryParams
            .subscribe(params => {
                if(params.return == "gallery") {
                    this.routerLink = "/gallery";
                }
                if(params.return == "responses") {
                    this.routerLink = "/allResponses/"+_id;
                }
                if(params.return == "scripts") {
                    this.routerLink = "/wizard";
                }
            }
        );

        let scripts: Script[] = this.activatedRoute.snapshot.data.model1;

        let artworks: Artwork[]  = this.activatedRoute.snapshot.data.model2;

        // get the script whether or not it is open
        // let SLscript = scripts.find(x => x._id == _id);

        // get the script only if it is open
        let SLscript = scripts.find(x => x._id == _id && x.open);

        if(SLscript == undefined) {
            this.scriptfound = false;
        }
        else {
            this.scriptfound = true;

            //need to make a deep copy so shuffled changes do not propogate back to the referenced script
            let NewScriptItem = JSON.parse(JSON.stringify(SLscript));

            this.currentScript = NewScriptItem;

            //get positions of shuffle stages
            let positions: number[] = [];
            let index: number = 0;
            for(var stage of this.currentScript.stages) {
                if(stage.shuffle) {
                    positions.push(index);
                }
                index = index+1;
            }

            //shuffle order of shuffle stages
            let shuffled = positions.slice().sort(() => (Math.random() > .5) ? 1 : -1);

            var mystages = this.currentScript.stages.slice();

            //shuffle the shuffle stages
            let shuffledStages = this.shuffleStages(mystages, positions, shuffled);
            
            this.currentScript.stages = shuffledStages;

            // set script id
            this.slowLookingScript = _id;

            // set current stage index to zero
            this.slowLookingCurrentScriptStageIndex = 0;  

            //set multiquestion index
            this.resetmultiquestionindex();

            // set maximum stage index to length -1
            this.slowLookingMaximumScriptStageIndex = this.currentScript.stages.length-1;

            // initialize activity of the script
            this.newActivity = new Activity();
            this.newActivity.script = this.currentScript;
            this.newActivity.approved = this.currentScript.autoapproved;

            //set lightbox images
            if(this.currentScript.artworkids.length > 0) {
                for(var artworkid of this.getUsedArtworkIds(this.currentScript)) {
                    let artworkindex = artworks.findIndex(x => x._id == artworkid);
                    if(artworkindex > -1) {
                        this.currentScriptImages.push(new ImageItem({src: artworks[artworkindex].url, thumb: artworks[artworkindex].url}));
                    }
                }
                this.lightboxGalleryRef = this.gallery.ref(this.currentScript._id);

                this.lightboxGalleryRef.load(this.currentScriptImages);
            }
        }
    }

    shuffleStages(stages: Stage[], positionOfShuffleStages: number[], shuffled: number[]): Stage[] {
        let index: number = 0;
        let newScriptStages: Stage[] = [];
        for(var stage of stages) {
            let i = positionOfShuffleStages.findIndex(x => x == index);
            if(i < 0) {
                newScriptStages.push(stage);
            }
            else {
                newScriptStages.push(stages[shuffled[i]]);
            }
            index = index+1;
        }
        return newScriptStages;
    }

    getUsedArtworkIds(script: Script) {
        let usedArtworkIds: string[] = [];
        if(script.homepageartworkid) {
            usedArtworkIds = [script.homepageartworkid];
        }
        else {
            usedArtworkIds = [];
        }
        if(script.stages) {
            for(var stage of script.stages) {
                for(var stageArtworkId of stage.includeartworks) {
                    if(!usedArtworkIds.includes(stageArtworkId)) {
                        usedArtworkIds.push(stageArtworkId);
                    }
                }
            }
        }
        return usedArtworkIds;
    }

    startLightbox(url: string) {
        //find url position in gallery
        let ind = this.currentScriptImages.findIndex(x => x.data.src == url);
        if(ind > -1) {
            this.openLightbox(ind);
        }
    }
    
    openLightbox(index: number) {
        this.lightbox.open(index, this.currentScript._id, {panelClass: 'fullscreen'});
    }

    answerChanged(event) {
        this.submittedAnswer = false;
    }

    randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

    randomiseQuestion(len:number) {
        if(this.remainingMultiquestions.length) {
            let selectednum = this.randomInt(0, this.remainingMultiquestions.length-1);
            this.multiquestionIndex=this.remainingMultiquestions[selectednum];
            this.setAnswerValue(this.remainingMultiquestions[selectednum]);
            this.remainingMultiquestions.splice(selectednum,1);
        }
        else {
            //all used up so repopulate remaining multiquestions
            this.resetmultiquestionindex();
        }
    }

    submittedAnswer = false;
    resetAnswerValue() {
        this.answervalue = new UntypedFormControl();
    }
    answervalue = new UntypedFormControl();
    setAnswerValue(index: number) {
        if(this.newMultiquestionAction.answers == undefined) {
            this.newMultiquestionAction.answers = [];
        }
        let qa = this.newMultiquestionAction.answers.find(x => x.question == index);
        if(qa) {
            this.answervalue.setValue(qa.answer);
        }
        else {
            this.answervalue.setValue("");
        }
    };

    updateAnswers(index: number, value: string) {
        let nqa = new questionanswer(index, value);
        if(this.newMultiquestionAction.answers == undefined) {
            this.newMultiquestionAction.answers = [];
        }

        let newarray = this.newMultiquestionAction.answers.filter(answer => answer.question != index);
        newarray.push(nqa);
        this.newMultiquestionAction.answers = newarray;
    }

    myanswers: Array<questionanswer> = [];

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

    newStoryAction: storyAction = new storyAction();

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
        this.newActivity.editor = this.currentScript.owner;
        
        // add author to activity
        let user = this.currentuser.getUser();
        let userID = user.id;
        if(userID == 0 || user.id == null) {
            this.newActivity.author = "";
            this.newActivity.authorname = "anonymous";
        }
        else {
            this.newActivity.author = user._id;
            if(user.displayname) {
                this.newActivity.authorname = user.displayname;
            }
            else {
                this.newActivity.authorname = user.username;
            }
        }
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
    
    addOrReplaceActionToActivity(i: number, action: Action) {
        if(this.newActivity.actions == undefined) {
            this.addActionToActivity(action);
        }
        else {
            const ind = this.newActivity.actions.findIndex(x => x.position == i);
            if(ind > -1) {
                this.newActivity.actions[ind] = action;
            }
            else {
                this.addActionToActivity(action);
            }
        }
    }

    getActionOfActivity(i: number) {
        if(this.newActivity.actions == undefined) {
            return undefined;
        }
        const ind = this.newActivity.actions.findIndex(x => x.position == i);
        if(ind > -1) {
            let action = this.newActivity.actions[ind];
            if(action instanceof questionAction) {
                // Question action
                this.newQuestionAction = action;
            }
            if(action instanceof storyAction) {
                // Story action
                this.newStoryAction = action;
            }
            if(action instanceof multiquestionAction) {
                // Multiquestion action
                this.newMultiquestionAction = action;
                // this.setAnswerValue(0);
            }
            return action;
        }
        else {
            return undefined;
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

    resetNewStoryAction() {
        this.newStoryAction = new storyAction();
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

    resetmultiquestionindex() {
        if(this.currentScript.stages[this.slowLookingCurrentScriptStageIndex].stagetype == "multiquestion") {
            if(!(this.currentScript.stages[this.slowLookingCurrentScriptStageIndex] as multiquestionStage).sequential) {
                this.remainingMultiquestions = Array.from(Array((this.currentScript.stages[this.slowLookingCurrentScriptStageIndex] as multiquestionStage).questions.length).keys()).map(x => x);
     
                let selectednum = this.randomInt(0, this.remainingMultiquestions.length-1);
                this.multiquestionIndex=this.remainingMultiquestions[selectednum];
                this.setAnswerValue(this.remainingMultiquestions[selectednum]);
                this.remainingMultiquestions.splice(selectednum,1);
            }
            else {
                this.multiquestionIndex=0;
                this.setAnswerValue(0);
            }
        }
        else {
            this.multiquestionIndex=0;
        }
    }

    //navigation actions

    statementContinue(i) {
        // (click)="statementContinue(i);"
        // (click)="slowLookingCurrentScriptStageIndex=i+1;"
        this.slowLookingCurrentScriptStageIndex=i+1;

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    statementEnd() {
        // (click)="statementEnd();"
        // (click)="addActivity(); slowLookingScript='0';"
        this.addActivity(); 
        this.slowLookingScript='0';
    }

    statementBack(i) {
        // (click)="statementBack(i);"
        this.slowLookingCurrentScriptStageIndex=i-1;

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    multiquestionContinue(multiquestionIndex, answervalue, stage, stagequestions, i, newMultiquestionAction) {
        // (click)="multiquestionContinue(multiquestionIndex, answer.value, stage, stage.body, i, newMultiquestionAction)"
        // (click)="updateAnswers(multiquestionIndex, answer.value); submittedAnswer=true; newMultiquestionAction.questionStage = stage; newMultiquestionAction.questions = stage.body; slowLookingCurrentScriptStageIndex=i+1; addActionToActivity(newMultiquestionAction); resetNewMultiQuestionAction(); resetAnswerValue(); showQuestionHelp=false; submittedAnswer=false; multiquestionIndex=0"
        this.updateAnswers(multiquestionIndex, answervalue);
        this.submittedAnswer=true; 
        this.newMultiquestionAction.questionStage = stage; 
        this.newMultiquestionAction.questions = this.getQuestionTextFromQuestions(stagequestions); 
        this.newMultiquestionAction.position = i;
        this.slowLookingCurrentScriptStageIndex=i+1; 
        // this.addActionToActivity(newMultiquestionAction); 
        this.addOrReplaceActionToActivity(i, newMultiquestionAction); 
        this.resetNewMultiQuestionAction(); 
        this.resetAnswerValue(); 
        this.showQuestionHelp=false; 
        this.submittedAnswer=false; 
        
        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        // this.multiquestionIndex=0;
        this.resetmultiquestionindex();

        this.showup();
    }

    multiquestionEnd(i, multiquestionIndex, answervalue, stage, stagequestions, newMultiquestionAction) {
        // (click)="multiquestionEnd(multiquestionIndex, answer.value, stage, stage.body, newMultiquestionAction)"
        // (click)="updateAnswers(multiquestionIndex, answer.value); submittedAnswer=true; newMultiquestionAction.questionStage = stage; newMultiquestionAction.questions = stage.body; addActionToActivity(newMultiquestionAction); resetNewMultiQuestionAction(); resetAnswerValue(); addActivity(); slowLookingScript='0'; multiquestionIndex=0"
        this.updateAnswers(multiquestionIndex,answervalue); 
        this.submittedAnswer=true; 
        this.newMultiquestionAction.questionStage = stage; 
        this.newMultiquestionAction.questions = this.getQuestionTextFromQuestions(stagequestions); 
        this.newMultiquestionAction.position = i;
        // this.addActionToActivity(newMultiquestionAction); 
        this.addOrReplaceActionToActivity(i, newMultiquestionAction); 
        this.resetNewMultiQuestionAction(); 
        this.resetAnswerValue(); 
        this.addActivity(); 
        this.slowLookingScript='0';
        this.multiquestionIndex=0;
        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }
    }

    multiquestionBack(multiquestionIndex, answervalue, stage, stagequestions, i, newMultiquestionAction) {
        this.updateAnswers(multiquestionIndex, answervalue);
        this.submittedAnswer=true; 
        this.newMultiquestionAction.questionStage = stage; 
        this.newMultiquestionAction.questions = this.getQuestionTextFromQuestions(stagequestions); 
        this.newMultiquestionAction.position = i;
        this.slowLookingCurrentScriptStageIndex=i-1; 
        // this.addActionToActivity(newMultiquestionAction); 
        this.addOrReplaceActionToActivity(i, newMultiquestionAction); 
        this.resetNewMultiQuestionAction(); 
        this.resetAnswerValue(); 
        this.showQuestionHelp=false; 
        this.submittedAnswer=false; 

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        // this.multiquestionIndex=0;
        this.resetmultiquestionindex();

        this.showup();
    }

    getQuestionTextFromQuestions(questions: Question[]) {
        let questionText = [];
        for(var question of questions) {
            questionText = questionText.concat(question.title);
        }
        return questionText;
    }

    questionContinue(i, stage, stagebody, newQuestionAction) {
        // (click)="questionContinue(i, stage, stage.body, newQuestionAction)"
        // (click)="slowLookingCurrentScriptStageIndex=i+1; newQuestionAction.questionStage = stage; newQuestionAction.question = stage.body; addActionToActivity(newQuestionAction); resetNewQuestionAction(); showQuestionHelp=false;"
        this.slowLookingCurrentScriptStageIndex=i+1; 
        this.newQuestionAction.questionStage = stage; 
        this.newQuestionAction.question = stagebody; 
        this.newQuestionAction.position = i;
        // this.addActionToActivity(newQuestionAction); 
        this.addOrReplaceActionToActivity(i, newQuestionAction); 
        this.resetNewQuestionAction(); 
        this.showQuestionHelp=false;

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    questionEnd(i, stage, stagebody, newQuestionAction) {
        // (click)="questionEnd(stage, stage.body, newQuestionAction);"
        // (click)="newQuestionAction.questionStage = stage; newQuestionAction.question = stage.body; addActionToActivity(newQuestionAction); resetNewQuestionAction(); addActivity(); slowLookingScript='0';" routerLink="/home"
        this.newQuestionAction.questionStage = stage; 
        this.newQuestionAction.question = stagebody; 
        this.newQuestionAction.position = i;
        // this.addActionToActivity(newQuestionAction); 
        this.addOrReplaceActionToActivity(i, newQuestionAction); 
        this.resetNewQuestionAction(); 
        this.addActivity(); 
        this.slowLookingScript='0';
    }

    questionBack(i, stage, stagebody, newQuestionAction) {
        this.slowLookingCurrentScriptStageIndex=i-1; 
        this.newQuestionAction.questionStage = stage; 
        this.newQuestionAction.question = stagebody; 
        this.newQuestionAction.position = i;
        // this.addActionToActivity(newQuestionAction); 
        this.addOrReplaceActionToActivity(i, newQuestionAction); 
        this.resetNewQuestionAction(); 
        this.showQuestionHelp=false;

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    storyContinue(i, stage, stagebody, newStoryAction) {
        // (click)="storyContinue(i, stage, stage.body, newStoryAction);"
        // (click)="slowLookingCurrentScriptStageIndex=i+1; newStoryAction.storyStage = stage; newStoryAction.question = stage.body; addActionToActivity(newStoryAction); resetNewStoryAction();"
        this.slowLookingCurrentScriptStageIndex=i+1; 
        this.newStoryAction.storyStage = stage; 
        this.newStoryAction.question = stagebody; 
        this.newStoryAction.position = i;
        // this.addActionToActivity(newStoryAction); 
        this.addOrReplaceActionToActivity(i, newStoryAction); 
        this.resetNewStoryAction();

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    storyEnd(i, stage, stagebody, newStoryAction) {
        // (click)="storyEnd(stage, stage.body, newStoryAction);"
        // (click)="newStoryAction.storyStage = stage; newStoryAction.question = stage.body; addActionToActivity(newStoryAction); resetNewStoryAction(); addActivity(); slowLookingScript='0';" routerLink="/home"
        this.newStoryAction.storyStage = stage; 
        this.newStoryAction.question = stagebody; 
        this.newStoryAction.position = i;
        // this.addActionToActivity(newStoryAction); 
        this.addOrReplaceActionToActivity(i, newStoryAction); 
        this.resetNewStoryAction(); 
        this.addActivity(); 
        this.slowLookingScript='0';
    }

    storyBack(i, stage, stagebody, newStoryAction) {
        this.slowLookingCurrentScriptStageIndex=i-1; 
        this.newStoryAction.storyStage = stage; 
        this.newStoryAction.question = stagebody; 
        this.newStoryAction.position = i;
        // this.addActionToActivity(newStoryAction); 
        this.addOrReplaceActionToActivity(i, newStoryAction); 
        this.resetNewStoryAction();

        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }

        this.resetmultiquestionindex();

        this.showup();
    }

    myanswer: string = "";

    updateCheckboxAnswer(option, event){
        if(event.target.checked) {
            this.addSelectionToAnswer(option);
        }
        else {
            this.removeSelectionFromAnswer(option);
        }
    }

    updateCheckboxMQAnswer(option, event){
        if(event.target.checked) {
            this.addSelectionToMQAnswer(option);
        }
        else {
            this.removeSelectionFromMQAnswer(option);
        }
    }

    addSelectionToAnswer(selection: string) {
        if(!this.newQuestionAction.answer) {
            this.newQuestionAction.answer = selection;
        }
        else {
            this.newQuestionAction.answer = this.newQuestionAction.answer+", "+selection;
        }
    }

    addSelectionToMQAnswer(selection: string) {
        if(!this.answervalue.value) {
            this.answervalue.setValue(selection);
        }
        else {
            this.answervalue.setValue(this.answervalue.value+", "+selection);
        }
    }


    removeSelectionFromAnswer(selection: string) {
        let ind = this.newQuestionAction.answer.indexOf(selection);
        if(ind > -1) {
            if(ind == 0) {
                if(ind+selection.length == this.newQuestionAction.answer.length) {
                    this.newQuestionAction.answer = this.newQuestionAction.answer.replace(selection,"");
                }
                else {
                    this.newQuestionAction.answer = this.newQuestionAction.answer.replace(selection+", ","");
                }
            }
            else {
                this.newQuestionAction.answer = this.newQuestionAction.answer.replace(", "+selection,"");
            }
        }
    }

    removeSelectionFromMQAnswer(selection: string) {
        if(this.answervalue.value) {
            let ind = this.answervalue.value.indexOf(selection);
            if(ind > -1) {
                if(ind == 0) {
                    if(ind+selection.length == this.answervalue.value.length) {
                        this.answervalue.setValue(this.answervalue.value.replace(selection,""));
                    }
                    else {
                        this.answervalue.setValue(this.answervalue.value.replace(selection+", ",""));
                    }
                }
                else {
                    this.answervalue.setValue(this.answervalue.value.replace(", "+selection,""));
                }
            }
        }
    }

    isSelectioninAnswer(selection: string) {
        if(this.newQuestionAction.answer) {
            return this.newQuestionAction.answer.includes(selection);
        }
        else {
            return false;
        }
    }

    isSelectioninMQAnswer(selection: string) {
        if(this.answervalue.value) {
            return this.answervalue.value.includes(selection);
        }
        else {
            return false;
        }
    }

    isQuestionMultiselect(qs: questionStage) {
        if(qs.question.multiselect != undefined) {
           return qs.question.multiselect;
        }
        else {
            return false;
        }
    }

    statementOnlyScript(script: Script) {
        for(var stage of script.stages) {
            if(stage.stagetype != "statement") {
                return false;
            }
        }
        return true;
    }
    
    foo(i) {
        console.log(i);
        console.log(this.newActivity);
        console.log(this.newQuestionAction);
        console.log(this.newStoryAction);
        console.log(this.newMultiquestionAction);
    }

}