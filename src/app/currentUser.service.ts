import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class CurrentUser{
    
    constructor(){}

    private user: User = new User;

    public getUserID(): number {
        return this.getUser().id;
    }

    public getUser(): User {
        let userstring = localStorage.getItem("user");
        let user = JSON.parse(userstring);
        if (user == null) {
            return this.user;
        }
        else {
            return user;
        }
    }

    public setUser(user: User) {
        let userstring = JSON.stringify(user);
        localStorage.setItem("user", userstring);
    }

    public logout() {
        localStorage.setItem("user", JSON.stringify(this.user));
    }

}