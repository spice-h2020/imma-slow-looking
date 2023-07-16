import { Component, OnInit } from "@angular/core";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { ActivatedRoute } from "@angular/router";
import { Artwork } from "./artwork.model";
import { Theme } from "./theme.model";
import { Exhibition } from "./exhibition.model";
import { ConfigSettings } from "./config";
import { User } from "./user.model";



@Component({
    selector: "paOverview",
    templateUrl: "overview.component.html"
})

export class OverviewComponent implements OnInit {

    public handleMissingImage(event: Event) {
        console.log(event);
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    constructor(public model: Model, private activatedRoute: ActivatedRoute){}

    // configuration settings
    configSettings = new ConfigSettings;

    scripts: Script[];
    artworks: Artwork[] = [];
    themes: Theme[];
    users: User[];
    exhibitions: Exhibition[];

    // selectedArtwork = undefined;
    // selectedTheme = undefined;
    // selectedScript = undefined;
    // selectedExhibition = undefined;

    userResults: {userid: string, name: string, searchstring: string, scripts: Script[]}[] = [];
    artworkResults: {artworkurl: string, name: string, artist: string, year: string, searchstring: string, scripts: Script[]}[] = [];
    themeResults: {themeid: string, name: string, description: string, searchstring: string, scripts: Script[]}[] = [];
    scriptResults: {searchstring: string, script: Script}[] = [];
    exhibitionResults: {exhibitionid: string, name: string, description: string, url: string, artwork: {name: string, artist: string, year: string, url: string}, searchstring: string, scripts: Script[]}[] = [];
    firstScripts: Script[] = [];

    //artwork search
    placeholderTextArtworks = this.configSettings.overview_searchplaceholder;
    keywordArtworks = 'searchstring';
    selectEventArtworks(item) {
        // do something with selected item
        this.model.selectedArtwork = item;
    }
  
    onChangeSearchArtworks(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedArtworks(e){
      // do something when input is focused
    }

    //theme search
    placeholderTextThemes = "Theme title or description";
    keywordThemes = 'searchstring';
    selectEventThemes(item) {
        // do something with selected item
        this.model.selectedTheme = item;
    }
  
    onChangeSearchThemes(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedThemes(e){
      // do something when input is focused
    }

    //exhibition search
    placeholderTextExhibitions = "Exhibition title or description";
    keywordExhibitions = 'searchstring';
    selectEventExhibitions(item) {
        // do something with selected item
        this.model.selectedExhibition = item;
    }
  
    onChangeSearchExhibitions(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedExhibitions(e){
      // do something when input is focused
    }

    //user search
    placeholderTextUsers = "Script author";
    keywordUsers = 'searchstring';
    selectEventUsers(item) {
        // do something with selected item
        this.model.selectedUser = item;
    }
    
    onChangeSearchUsers(val: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedUsers(e){
        // do something when input is focused
    }

    //script search
    placeholderTextScripts = "Script title, description or author";
    keywordScripts = 'searchstring';
    selectEventScripts(item) {
        // do something with selected item
        this.model.selectedOverviewScript = item;
    }
    
    onChangeSearchScripts(val: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedScripts(e){
        // do something when input is focused
    }
    
    ngOnInit() {
        this.scripts = this.activatedRoute.snapshot.data.model1;
        this.artworks = this.activatedRoute.snapshot.data.model2;
        this.themes = this.activatedRoute.snapshot.data.model3;
        this.exhibitions = this.activatedRoute.snapshot.data.model6;

        for(var script of this.scripts) {
            //only include scripts with a homepageartwork, at least one artwork and at lest one stage
            if(script.homepageartworkid != undefined && script.artworkids.length > 0 && script.stages.length > 0) {

                if(script.visible) {
                    //add to the artwork result array
                    if(script.artworkids) {
                        for(var artworkid of script.artworkids) {
                            let artind = this.artworks.findIndex(x => x._id == artworkid);
                            if(artind > -1) {
                                let artresind = this.artworkResults.findIndex(x => x.artworkurl == this.artworks[artind].url);
                                if(artresind > -1) {
                                    if(!(this.artworkResults[artresind].scripts.find(x => x._id == script._id))) {
                                        this.artworkResults[artresind].scripts.push(script);
                                    }
                                }
                                else {
                                    this.artworkResults.push({artworkurl: this.artworks[artind].url, name: this.artworks[artind].name, artist: this.artworks[artind].artist, year: this.artworks[artind].year, searchstring: this.artworks[artind].name+", "+this.artworks[artind].artist+", "+this.artworks[artind].year, scripts: [script]});
                                }
                            }
                        }
                    }

                    //add to the theme result array
                    if(script.themeids) {
                        for(var themeid of script.themeids) {
                            let themeresind = this.themeResults.findIndex(x => x.themeid == themeid);
                            if(themeresind > -1) {
                                this.themeResults[themeresind].scripts.push(script);
                            }
                            else {
                                let themeind = this.themes.findIndex(x => x._id == themeid);
                                if(themeind > -1) {
                                    this.themeResults.push({themeid: themeid, name: this.themes[themeind].name, description: this.themes[themeind].description, searchstring: this.themes[themeind].name+": "+this.themes[themeind].description, scripts: [script]});
                                }
                            }
                        }
                    }

                    //add to the user result array
                    if(script.owner) {
                        let userresind = this.userResults.findIndex(x => x.userid == script.owner);
                        if(userresind > -1) {
                            this.userResults[userresind].scripts.push(script);
                        }
                        else {
                            this.userResults.push({userid: script.owner, name: script.author, searchstring: script.author, scripts: [script]});
                        }
                    }

                    //add to the exhibition result array
                    if(script.exhibitionids) {
                        for(var exhibitionid of script.exhibitionids) {
                            let exhibitionresind = this.exhibitionResults.findIndex(x => x.exhibitionid == exhibitionid);
                            if(exhibitionresind > -1) {
                                this.exhibitionResults[exhibitionresind].scripts.push(script);
                            }
                            else {
                                let exhibitionind = this.exhibitions.findIndex(x => x._id == exhibitionid);
                                if(exhibitionind > -1) {
                                    this.exhibitionResults.push({exhibitionid: exhibitionid, name: this.exhibitions[exhibitionind].name, description: this.exhibitions[exhibitionind].description, url: this.exhibitions[exhibitionind].url, 
                                        artwork: {name: this.exhibitions[exhibitionind].artwork.name, artist: this.exhibitions[exhibitionind].artwork.artist, year: this.exhibitions[exhibitionind].artwork.year, url: this.exhibitions[exhibitionind].artwork.url}, 
                                        searchstring: this.exhibitions[exhibitionind].name + ": " + this.exhibitions[exhibitionind].description, scripts: [script]});
                                }
                            }
                        }
                    }
                    //add to the script result array
                    this.scriptResults.push({searchstring: script.name+": "+script.description+" - "+script.author, script: script});
                }
            }
        }

        //get random scripts for feature
        let shuffled = this.scriptResults
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        for(var scr of shuffled.slice(0,5)) {
            this.firstScripts.push(scr.script);
        }
    }

    getArtworkFromId(_id: string) {
        let ind = this.artworks.findIndex(x => x._id == _id);
        if(ind > -1) {
            return [this.artworks[ind]];
        }
        else {
            return [];
        }
    }

    getExhibitionsFromIds(_ids: string[]) {
        let exhibitions = [];
        for(var _id of _ids) {
            let ind = this.exhibitions.findIndex(x => x._id == _id);
            if(ind > -1) {
                exhibitions.push(this.exhibitions[ind]);
            }
        }
        return exhibitions;
    }

    getThemesFromIds(_ids: string[]) {
        let themes = [];
        for(var _id of _ids) {
            let ind = this.themes.findIndex(x => x._id == _id);
            if(ind > -1) {
                themes.push(this.themes[ind]);
            }
        }
        return themes;
    }

    getScriptOverviewData() {
        const scripts = this.model.getScripts();
        const artworks = this.model.getArtworks();
        const themes = this.model.getThemes();

        for(var script of scripts) {
            if(script.visible) {

                //add to the artwork result array
                for(var artworkid of script.artworkids) {
                    let artind = artworks.findIndex(x => x._id == artworkid);
                    if(artind > -1) {
                        let artresind = this.artworkResults.findIndex(x => x.artworkurl == artworks[artind].url);
                        if(artresind > -1) {
                            this.artworkResults[artresind].scripts.push(script);
                        }
                        else {
                            this.artworkResults.push({artworkurl: artworks[artind].url, name: artworks[artind].name, artist: artworks[artind].artist, year: artworks[artind].year, searchstring: artworks[artind].name+", "+artworks[artind].artist+", "+artworks[artind].year, scripts: [script]});
                        }
                    }
                }

                //add to the theme result array
                for(var themeid of script.themeids) {
                    let themeresind = this.themeResults.findIndex(x => x.themeid == themeid);
                    if(themeresind > -1) {
                        this.themeResults[themeresind].scripts.push(script);
                    }
                    else {
                        let themeind = themes.findIndex(x => x._id == themeid);
                        if(themeind > -1) {
                            this.themeResults.push({themeid: themeid, name: themes[themeind].name, description: themes[themeind].description, searchstring: themes[themeind].name+": "+themes[themeind].description, scripts: [script]});
                        }
                    }
                }

                //add to the script result array
                this.scriptResults.push({searchstring: script.name+": "+script.description+" - "+script.author, script: script});
            }
        }
    }

    statementOnlyScript(script: Script) {
        for(var stage of script.stages) {
            if(stage.stagetype != "statement") {
                return false;
            }
        }
        return true;
    }

}
