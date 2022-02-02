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

    addUser(user: User) {
        //check if username already taken
        if(user.id == undefined && this.usernameTaken(user)) {
            this.duplicateUser = true;
        }
        else {
            this.duplicateUser = false;
            this.model.saveUser(user);
            this.newUser = new User();
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
