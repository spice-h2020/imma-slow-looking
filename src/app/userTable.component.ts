import { Component, QueryList, ViewChildren } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";
import { User } from "./user.model";
import {
    SortableHeaderDirective,
    SortEvent,
    compare,
  } from './sortable-header.directive';

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

    searchText = "";

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

    data: Array<User> = this.getUsers();
    users: Array<User> = this.getUsers();

    @ViewChildren(SortableHeaderDirective)
    headers: QueryList<SortableHeaderDirective>;

    addUser(user: User, existingUser: boolean) {
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

    onSort({ column, direction }: SortEvent) {
        console.log(column, direction);
        // resetting other headers
        this.headers.forEach((header) => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });
    
        // sorting 
        if (direction === '' || column === '') {
          this.users = this.data;
        } else {
          this.users = [...this.data].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
          });
        }
    }
}
