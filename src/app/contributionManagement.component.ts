import { Component } from "@angular/core";
import { Activity } from "./activity.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { User } from "./user.model";

@Component({
    selector: "paContributionManagement",
    templateUrl: "contributionManagement.component.html"
})

export class ContributionManagementComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    currentUser: number = 1;

    deleteConfirmation_Id = "";

    editContribution: string = "";

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
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == undefined) {
            return [];
        }

        // admin sees all activites
        if(userID == 1) {
            let editorID = this.get_IDOfUserID(this.currentUser);
            if(editorID != undefined) {
                let filteredActivities = activities.filter(x => x.editor == editorID);
                return filteredActivities;
            }
            else {
                let filteredActivities: Array<Activity> = [];
                return filteredActivities;
            }
        }

        let filteredActivities = activities.filter(x => x.editor == user._id);
        return filteredActivities;
    }

    get_IDOfUserID(currentUser: number) {
        let myuser = this.getUsers().find(user => user.id == currentUser);
        if(myuser != undefined) {
            return myuser._id;
        }
        else {
            return undefined;
        }
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != undefined;
    }

    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }

    getUsers(): User[] {
        return this.model.getUsers().sort((a, b) => (a.id < b.id) ? -1 : 1);;
    }

}


