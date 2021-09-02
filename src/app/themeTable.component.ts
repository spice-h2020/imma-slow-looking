// import { Component, OnInit } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Theme } from "./theme.model";
import { Model } from "./repository.model";
import { by } from "protractor";

@Component({
    selector: "paThemeTable",
    templateUrl: "themeTable.component.html"
})


export class ThemeTableComponent {

    constructor(private model: Model){}

    editrow: string = "";

    tableEditing: boolean = false;

    newTheme: Theme = new Theme();

    // model: Model = new Model();

    addTheme(theme: Theme) {
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
        let newPosition = event.target.value;
        this.model.updateThemePosition(theme, newPosition);
    }

    shiftThemePosition(event,old){
        this.model.shiftThemePosition(old, event.target.value);
    }

}