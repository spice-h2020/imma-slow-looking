import { Component, OnInit } from "@angular/core";
import { Activity } from "./activity.model";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
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
        let index = users.findIndex(x => x.username == this.username && x.password == this.password);
        if(index > -1) {
            this.setCurrentUser(users[index]);
            this.loginFailed = false;
        }
        else {
            this.loginFailed = true;
        }
    }

    getActivitiesOfCurrentUser(): Activity[] {
        if(this.currentuser.getUserID() == 0) {
            return [];
        }
        else {
            return this.model.getActivities().filter(x => x.author == this.currentuser.getUser()._id);
        }
    }

    deleteActivity(_id: string) {
        this.model.deleteActivity(_id);
    }
}