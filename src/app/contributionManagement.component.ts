import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";

@Component({
    selector: "paContributionManagement",
    templateUrl: "contributionManagement.component.html"
})

export class ContributionManagementComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    managementMode: number = 1;

    saveActivity(activity: Activity) {
        this.model.saveActivity(activity);
    }

    getActivities(): Activity[] {
        let activities = this.model.getActivities();

        let filteredActivities = this.filterActivitiesForLogin(activities);
        
        return filteredActivities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    deleteActivity(_id: string) {
        this.model.deleteActivity(_id);
    }

    getApprovedActivities(): Activity[] {
        let activities = this.model.getApprovedActivities();

        let filteredActivities = this.filterActivitiesForLogin(activities);
        
        return filteredActivities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    getUnpprovedActivities(): Activity[] {
        let activities = this.model.getUnapprovedActivities().sort((a, b) => (a.id > b.id) ? -1 : 1);

        let filteredActivities = this.filterActivitiesForLogin(activities);
        
        return filteredActivities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    filterActivitiesForLogin(activities: Activity[]): Activity[] {
        let userID = this.currentuser.getUserID();
        let user = this.currentuser.getUser();

        if (userID == 0) {
            return [];
        }

        // admin sees all activites
        if(userID == 1) {
            return activities;
        }

        let filteredActivities = activities.filter(x => x.editor == user._id);
        return filteredActivities;
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != 0;
    }
}


