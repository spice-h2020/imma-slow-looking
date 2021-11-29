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
        console.log("get user");
        console.log(user);
        console.log(this.user);
        return user;
    }

    public setUser(user: User) {
        let userstring = JSON.stringify(user);
        localStorage.setItem("user", userstring);
        console.log("set user");
        console.log(userstring);
        this.user = user;
    }

    public logout() {
        // localStorage.clear();
        this.user = new User;
        localStorage.setItem("user", JSON.stringify(this.user));
        console.log("clear");
    }

}