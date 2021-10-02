import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";

@Component({
    selector: "paContributionManagement",
    templateUrl: "contributionManagement.component.html"
})

export class ContributionManagementComponent {

    constructor(private model: Model){}

    managementMode: number = 1;

    saveActivity(activity: Activity) {
        this.model.saveActivity(activity);
    }

    getActivities(): Activity[] {
        return this.model.getActivities().sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    deleteActivity(_id: string) {
        this.model.deleteActivity(_id);
    }

    getApprovedActivities(): Activity[] {
        return this.model.getApprovedActivities().sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    getUnpprovedActivities(): Activity[] {
        return this.model.getUnapprovedActivities().sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

}


