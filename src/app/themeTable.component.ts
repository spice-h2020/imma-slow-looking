// import { Component, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Theme } from "./theme.model";
import { Model } from "./repository.model";

@Component({
    selector: "paThemeTable",
    templateUrl: "themeTable.component.html"
})

export class ThemeTableComponent {

    constructor(private model: Model){}

    editrow: number = 0;

    tableEditing: boolean = false;

    newTheme: Theme = new Theme();

    // model: Model = new Model();

    addTheme(theme: Theme) {
        this.model.saveTheme(theme);
        this.newTheme = new Theme();
        this.tableEditing = false;
    }

    deleteTheme(id: number) {
        //delete theme from scripts
        let theme = this.getTheme(id);
        this.model.deleteThemeFromScripts(id, theme);

        //delete theme from theme list
        this.model.deleteTheme(id);
        this.tableEditing = false;
    }
    
    getTheme(id: number): Theme {
        return this.model.getTheme(id);
    }

    getThemes(): Theme[] {
        // return this.dbthemes;
        return this.model.getThemes();
    }

    shiftThemePosition(event,old){
        this.model.shiftThemePosition(old, event.target.value);
    }

}