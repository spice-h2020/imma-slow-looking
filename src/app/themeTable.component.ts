import { Component, OnInit } from "@angular/core";
import { Theme } from "./theme.model";
import { Model } from "./repository.model";
import { CurrentUser } from "./currentUser.service";
import { User } from "./user.model";
import { ThrowStmt } from "@angular/compiler";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
    selector: "paThemeTable",
    templateUrl: "themeTable.component.html"
})

export class ThemeTableComponent {

    constructor(public currentuser: CurrentUser, private model: Model){}

    getUsers(): User[] {
        return this.model.getUsers();
    }

    getCurrentUser_ID() {
        let user = this.currentuser.getUser();
        if(user._id != undefined) {
            return user._id;
        }
        else {
            return "";
        }
    }

    isAdmin() {
        return this.currentuser.getUserID() == 1;
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != undefined;
    }

    writeAccess(theme: Theme): boolean {
        if(this.isAdmin()) {
            return true;
        }
        if(theme.owner == undefined) {
            return false;
        }
        if(theme.owner == this.getCurrentUser_ID()) {
            return true;
        }
        return false;
    }

    editrow: string = "";

    tableEditing: boolean = false;

    newTheme: Theme = new Theme();

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    resetThemeId(theme: Theme, newId: number) {
        theme.id = newId;
        this.model.saveTheme(theme);
    }

    addTheme(theme: Theme) {
        //add current user as owner
        let currentUser_ID = this.getCurrentUser_ID();
        if (currentUser_ID && !theme.owner) {
            theme.owner = currentUser_ID;
        }

        this.model.saveTheme(theme);
        this.newTheme = new Theme();
        this.tableEditing = false;
    }

    deleteTheme(_id: string) {
        //delete theme from scripts
        let theme = this.getTheme(_id);
        this.model.deleteThemeFromScripts(_id, theme);

        //delete theme from theme list
        this.model.deleteTheme(_id);
        this.tableEditing = false;
    }
    
    getTheme(_id: string): Theme {
        return this.model.getTheme(_id);
    }

    getThemes(): Theme[] {
        // return this.dbthemes;
        let themes =  this.model.getThemes();
        let sortedThemes = themes.sort((a, b) => (a.id < b.id) ? -1 : 1);
        return sortedThemes;
    }

    updateThemePosition(theme: Theme, event) {
        console.log(theme, event);
        let newPosition = event.target.value;
        this.model.updateThemePosition(theme, newPosition);
    }

    getThemeOfPosition (position: number) {
        let themes =  this.model.getThemes();
        let theme = themes.find(x => position == x.id);
        return theme;
    }

    set_theme_id() {
        let _id: string = "theme_1";
        let id: number = 1;
        let theme = this.getTheme(_id);
        theme.id = id;
        this.model.saveTheme(theme);
    }

    reloadThemes() {
        this.model.refreshThemes();
    }

    drop(event: CdkDragDrop<string[]>) {
        console.log(event);
        let theme = this.getThemeOfPosition(event.previousIndex+1);
        if(theme != undefined) {
            this.model.updateThemePosition(theme, event.currentIndex+1);
        }
    }
}