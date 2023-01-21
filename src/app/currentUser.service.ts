import { Injectable } from "@angular/core";
import { ConfigSettings } from "./config";
import { User } from "./user.model";

@Injectable()
export class CurrentUser{
    
    constructor(){}

    // configuration settings
    private configSettings = new ConfigSettings;

    private user: User = new User;

    public getUserID(): number {
        return this.getUser().id;
    }

    public getUser(): User {
        let userstring = localStorage.getItem(this.configSettings.userVariable);
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
        localStorage.setItem(this.configSettings.userVariable, userstring);
    }

    public logout() {
        localStorage.setItem(this.configSettings.userVariable, JSON.stringify(this.user));
    }

}