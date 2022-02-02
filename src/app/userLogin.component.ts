import { Component, OnInit } from "@angular/core";
import { Activity } from "./activity.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { User } from "./user.model";

@Component({
    selector: "paUserLogin",
    templateUrl: "userLogin.component.html"
})

export class UserLoginComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    newUser: User = new User();

    editContribution: string = "";

    username: string = "";

    password: string = "";

    clearNewUser() {
        this.username = "";
        this.password = "";
    }

    loginFailed = false;

    getUsers(): User[] {
        return this.model.getUsers();
    }

    setCurrentUser(user: User) {
        this.currentuser.setUser(user);
    }

    getCurrentUserID() {
        return this.currentuser.getUserID();
    }

    getCurrentUsername() {
        let user = this.currentuser.getUser();
        if(user.username != undefined) {
            return user.username;
        }
    }

    logout() {
        this.currentuser.logout();
    }
    
    loginAttempt() {
        let users = this.getUsers();
        let index = users.findIndex(x => x.username.toUpperCase() == this.username.toUpperCase() && x.password == this.password);
        if(index > -1) {
            this.setCurrentUser(users[index]);
            this.loginFailed = false;
        }
        else {
            this.loginFailed = true;
        }
    }

    getActivitiesOfCurrentUser(): Activity[] {
        if(this.currentuser.getUserID() == undefined) {
            return [];
        }
        else {
            return this.model.getActivities().filter(x => x.author == this.currentuser.getUser()._id);
        }
    }

    deleteActivity(_id: string) {
        this.model.deleteActivity(_id);
    }

    saveActivity(activity: Activity) {
        let script = this.getScript(activity.script._id);
        if(this.currentuser.getUser()._id != activity.script.owner) {
            if(!script.autoapproved) {
                activity.approved = false;
            }
        }
        this.model.saveActivity(activity);
    }

    getScript(_id: string): Script {
        return this.model.getScript(_id);
    }

}
