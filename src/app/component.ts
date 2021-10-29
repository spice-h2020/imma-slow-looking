import { Component } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { User } from "./user.model";

@Component({
    selector: 'app',
    templateUrl: './template.html'
})

export class SlowLookingComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}
    
    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }

    isLoggedOut() {
        return this.currentuser.getUserID() == 0;
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