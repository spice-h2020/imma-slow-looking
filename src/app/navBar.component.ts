import { Component } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { User } from "./user.model";


@Component({
    selector: "paNavBar",
    templateUrl: "navBar.component.html"
})

export class NavBarComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }

    isLoggedOut() {
        return this.currentuser.getUserID() == undefined;
    }

    getUsers(): User[] {
        return this.model.getUsers();
    }

    getCurrentUsername() {
        let user = this.currentuser.getUser();
        if(user.username != undefined) {
            return user.username;
        }
    }

}