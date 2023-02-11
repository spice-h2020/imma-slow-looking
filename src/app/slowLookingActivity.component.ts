import { Component, OnInit } from "@angular/core";
import { Action, followAction, questionAction, shareWithFriendAction, shareWithMusemAction, multiquestionAction, questionanswer, storyAction } from "./action.model";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { Artwork } from "./artwork.model";
import { followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, multiquestionStage } from "./stage.model";
import { ActivatedRoute } from "@angular/router";
import { UntypedFormControl } from "@angular/forms";
import { CurrentUser } from "./currentUser.service";
import { Gallery, GalleryItem, GalleryRef, ImageItem } from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
import { Question } from "./question.model";


@Component({
    selector: "paSlowLookingActivity",
    templateUrl: "slowLookingActivity.component.html"
})

export class SlowLookingActivityComponent implements OnInit {

    showup() {
        window.scroll(0,0);
    }

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
        
        //return to overview rather than home page
        this.activatedRoute.queryParams
            .subscribe(params => {
                if(params.return == "overview") {
                    this.routerLink = "/overview";
                }
                if(params.return == "responses") {
                    this.routerLink = "/allResponses/"+_id;
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

            this.currentScript = SLscript;

            // set script id
            this.slowLookingScript = _id;

            // set current stage index to zero
            this.slowLookingCurrentScriptStageIndex = 0;  

            // set maximum stage index to length -1
            this.slowLookingMaximumScriptStageIndex = SLscript.stages.length-1;

            // initialize activity of the script
            this.newActivity = new Activity();
            this.newActivity.script = SLscript;
            this.newActivity.approved = SLscript.autoapproved;

            //set lightbox images
            if(SLscript.artworkids.length > 0) {
                for(var artworkid of this.getUsedArtworkIds(SLscript)) {
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
        this.lightbox.open(index, this.currentScript._id);
    }

    answerChanged(event) {
        this.submittedAnswer = false;
    }

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
                this.setAnswerValue(0);
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

    //navigation actions

    statementContinue(i) {
        // (click)="statementContinue(i);"
        // (click)="slowLookingCurrentScriptStageIndex=i+1;"
        this.slowLookingCurrentScriptStageIndex=i+1;
        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }
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
        this.multiquestionIndex=0;
        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }
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
        this.multiquestionIndex=0;
        if(this.slowLookingCurrentScriptStageIndex >= 0) {
            this.getActionOfActivity(this.slowLookingCurrentScriptStageIndex);
        }
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
        this.showup();
    }

    foo(i) {
        console.log(i);
        console.log(this.newActivity);
        console.log(this.newQuestionAction);
        console.log(this.newStoryAction);
        console.log(this.newMultiquestionAction);
    }

}