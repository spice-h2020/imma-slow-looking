import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { Model } from "./repository.model";

@Component({
    selector: "paContributionManagement",
    templateUrl: "contributionManagement.component.html"
})

export class ContributionManagementComponent {

    managementMode: number = 1;

    model: Model = new Model();

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


