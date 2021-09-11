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
        return this.model.getActivities();
    }

    deleteActivity(_id: string) {
        this.model.deleteActivity(_id);
    }

    getApprovedActivities(): Activity[] {
        return this.model.getApprovedActivities();
    }

    getUnpprovedActivities(): Activity[] {
        return this.model.getUnapprovedActivities();
    }

}


