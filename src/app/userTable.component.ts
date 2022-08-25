import { Component, OnInit } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { User } from "./user.model";

@Component({
    selector: "paUserTable",
    templateUrl: "userTable.component.html"
})

export class UserTableComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    getCurrentUserID() {
        return this.currentuser.getUserID();
    }

    getCurrentUsername() {
        let user = this.currentuser.getUser();
        if(user.username != undefined) {
            return user.username;
        }
    }

    editrow: string = "";

    tableEditing: boolean = false;

    newUser: User = new User();

    deleteConfirmation_Id = "";

    duplicateUser = false;

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    getUser(_id: string): User {
        return this.model.getUser(_id);
    }

    getUsers(): User[] {
        let users =  this.model.getUsers();
        let sortedUsers = users.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedUsers;
    }

    addUser(user: User, existingUser: boolean) {
        console.log(existingUser);
        //check if username already taken
        if(user.id == undefined && this.usernameTaken(user)) {
            this.duplicateUser = true;
        }
        else {
            this.duplicateUser = false;
            this.model.saveUser(user);
            this.newUser = new User();
        }
        //update display name on existing scripts and responses
        if(existingUser && user.displayname) {
            //update scripts
            const scripts = this.model.getScripts();
            for(var script of scripts) {
                if(script.owner == user._id && script.author != user.displayname) {
                    script.author = user.displayname;
                    this.model.saveScript(script);
                }
            }
            //update responses
            const activities = this.model.getActivities();
            for(var activity of activities) {
                if(activity.author == user._id && activity.authorname != user.displayname) {
                    activity.authorname = user.displayname;
                    this.model.saveActivity(activity);
                }
            }
        }
    }

    usernameTaken(user: User) {
        let users = this.getUsers();
        let x = user.username;
        let index = users.findIndex(x => x.username.toUpperCase() == user.username.toUpperCase());
        if(index > -1) {
            return true;
        }
        else {
            return false;
        }
    }

    deleteUser(_id: string) {
        this.model.deleteUser(_id);
    }
}
