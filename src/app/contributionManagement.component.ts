import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";

@Component({
    selector: "paContributionManagement",
    templateUrl: "contributionManagement.component.html"
})

export class ContributionManagementComponent {

    constructor(private model: Model){}
    // model: Model = new Model();

    managementMode: number = 1;

    getActivities(): Activity[] {
        return this.model.getActivities();
    }

    deleteActivity(id: number) {
        this.model.deleteActivity(id);
    }

    getApprovedActivities(): Activity[] {
        return this.model.getApprovedActivities();
    }

    getUnpprovedActivities(): Activity[] {
        return this.model.getUnapprovedActivities();
    }

}


