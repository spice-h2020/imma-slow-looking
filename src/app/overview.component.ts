import { Component, OnInit } from "@angular/core";
import { Model } from "./repository.model";
import { Script } from "./script.model";
import { ActivatedRoute } from "@angular/router";
import { Artwork } from "./artwork.model";
import { Theme } from "./theme.model";



@Component({
    selector: "paOverview",
    templateUrl: "overview.component.html"
})

export class OverviewComponent implements OnInit {

    constructor(private model: Model, private activatedRoute: ActivatedRoute,){}

    scripts: Script[];
    artworks: Artwork[] = [];
    themes: Theme[];

    selectedArtwork = undefined;
    selectedTheme = undefined;
    selectedScript = undefined;

    artworkResults: {artworkurl: string, name: string, artist: string, year: string, searchstring: string, scripts: Script[]}[] = [];
    themeResults: {themeid: string, name: string, description: string, searchstring: string, scripts: Script[]}[] = [];
    scriptResults: {searchstring: string, script: Script}[] = [];
    firstScripts: Script[] = [];

    //artwork search
    placeholderTextArtworks = "Artwork, artist or year";
    keywordArtworks = 'searchstring';
    dataArtworks = this.artworks;
    selectEventArtworks(item) {
        // do something with selected item
        console.log(item);
        this.selectedArtwork = item;
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
    dataThemes = this.artworks;
    selectEventThemes(item) {
        // do something with selected item
        console.log(item);
        this.selectedTheme = item;
    }
  
    onChangeSearchThemes(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocusedThemes(e){
      // do something when input is focused
    }

    //script search
    placeholderTextScripts = "Script title or description";
    keywordScripts = 'searchstring';
    dataScripts = this.artworks;
    selectEventScripts(item) {
        // do something with selected item
        console.log(item);
        this.selectedScript = item;
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

        for(var script of this.scripts) {
            if(script.visible || script.open) {

                //add to the artwork result array
                for(var artworkid of script.artworkids) {
                    let artind = this.artworks.findIndex(x => x._id == artworkid);
                    if(artind > -1) {
                        let artresind = this.artworkResults.findIndex(x => x.artworkurl == this.artworks[artind].url);
                        if(artresind > -1) {
                            this.artworkResults[artresind].scripts.push(script);
                        }
                        else {
                            this.artworkResults.push({artworkurl: this.artworks[artind].url, name: this.artworks[artind].name, artist: this.artworks[artind].artist, year: this.artworks[artind].year, searchstring: this.artworks[artind].name+", "+this.artworks[artind].artist+", "+this.artworks[artind].year, scripts: [script]});
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
                        let themeind = this.themes.findIndex(x => x._id == themeid);
                        if(themeind > -1) {
                            this.themeResults.push({themeid: themeid, name: this.themes[themeind].name, description: this.themes[themeind].description, searchstring: this.themes[themeind].name+": "+this.themes[themeind].description, scripts: [script]});
                        }
                    }
                }

                //add to the script result array
                this.scriptResults.push({searchstring: script.name+": "+script.description+" - "+script.author, script: script});
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


        console.log(this.artworkResults);
        console.log(this.themeResults);
        console.log(this.scriptResults);

    }

    foo() {
        console.log(this.artworks);
        console.log(this.artworkResults);
        console.log(this.themeResults);
        console.log(this.scriptResults);
        console.log(this.firstScripts);
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

    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

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
        console.log("hello");
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
        console.log(this.artworkResults);
        console.log(this.themeResults);
        console.log(this.scriptResults);
    }




}
