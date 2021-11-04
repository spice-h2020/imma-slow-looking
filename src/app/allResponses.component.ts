import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";
import { Script } from "./script.model";


@Component({
    selector: "paAllResponses",
    templateUrl: "allResponses.component.html"
})

export class AllResponsesComponent implements OnInit {

    constructor(
        private model: Model,
        private activatedRoute: ActivatedRoute,
        ){}

    slowLookingScript = "0";

    ngOnInit() {
        let _id = this.activatedRoute.snapshot.params.id;

        // get the script
        let SLscript = this.getScript(_id);

        // set script id
        this.slowLookingScript = _id;
    }

    getScript(_id: string): Script {
        return this.model.getScript(_id);
    }

    getScriptsOfScriptID(_id: string) {
        return [this.model.getScript(_id)];
    }

    getArtworkFromId(artworkId: string) {
        return [this.getArtwork(artworkId)];
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

    getApprovedActivitiesOfAScript(_id: string): Activity[] {
        let activities = this.model.getApprovedActivitiesOfAScript(_id);
        return activities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    addLikeToActivity(activity: Activity) {
        activity.likes = activity.likes+1;
        this.model.saveActivity(activity);
    }
}