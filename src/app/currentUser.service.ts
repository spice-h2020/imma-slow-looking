import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class CurrentUser{
    private userID = 0;
    private user: User = new User;

    public getUserID(): number {
        return this.userID;
    }

    public getUser(): User {
        return this.user;
    }

    public setUser(user: User) {
        this.userID = user.id;
        this.user = user;
    }

    public logout() {
        this.userID = 0;
        this.user = new User;
    }

}