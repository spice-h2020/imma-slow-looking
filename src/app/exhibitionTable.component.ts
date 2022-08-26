import { Component } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { Exhibition } from "./exhibition.model";
import { Model } from "./repository.model";

@Component({
    selector: "paExhibitionTable",
    templateUrl: "exhibitionTable.component.html"
})

export class ExhibitionTableComponent {
    constructor(public currentuser: CurrentUser, private model: Model){}

    editrow=undefined;
    tableEditing=false;
    deleteConfirmation_Id = undefined;

    newExhibition: Exhibition = new Exhibition();

    updateExhibition(exhibition: Exhibition) {
        if(this.selected) {
            exhibition.artwork = {name: this.selectItem["name"], artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"]}
        }
        this.addExhibition(exhibition);
    }

    saveExhibition() {
        const exhibition: Exhibition = {type: "exhibition", name: this.newExhibition.name, description: this.newExhibition.description, 
        url: this.newExhibition.url, artwork: {name: this.selectItem["name"], artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"]}};

        this.addExhibition(exhibition);

        this.newExhibition = new Exhibition();
        this.selected  = false;
        this.selectItem = [];

        // //add current user_ID as owner
        // let user_ID = this.currentuser.getUser()._id;
        // artwork.owner = user_ID;              

        // let currentArtworksOfLogin = this.getArtworks();
        // if(!(currentArtworksOfLogin.find(x => x.owner == artwork.owner && x.url == artwork.url))) {
        //     this.model.saveArtwork(artwork);
        // }
    }

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    getExhibition(_id: string): Exhibition {
        return this.model.getExhibition(_id);
    }

    getExhibitions(): Exhibition[] {
        return  this.model.getExhibitions();
    }

    addExhibition(exhibition: Exhibition) {
        this.model.saveExhibition(exhibition);
    }

    deleteExhibition(_id: string) {
        //delete exhibition from scripts
        const scripts = this.getScriptsOfAnExhibition(_id);
        this.model.removeExhibitionFromScripts(scripts, _id)

        //delete theme from theme list
        this.model.deleteExhibition(_id);
    }

    //current user
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

    // Artwork selection
    updateSelectItem(item) {
        // if(item.artwork) {
        //     if(item.artwork.name && item.artwork.artist && item.artwork.year && item.artwork.url) {
        //         this.selectItem["name"] = item.artwork.name;
        //         this.selectItem["artist"] = item.artwork.artist;
        //         this.selectItem["year"] = item.artwork.year;
        //         this.selectItem["filelocation"] = item.artwork.url;
        //     }
        // }
    }

    placeholderText = "Artwork, artist or year";
    selected: boolean = false;
    selectItem: Array<any> = [];

    resetSelected() {
        this.selected = false;
        this.selectItem = [];
    }

    keyword = 'searchstring';
    data = this.model.getCollection();

    selectEvent(item) {
        // do something with selected item
        this.selected = true;
        this.selectItem = item;
    }
  
    onChangeSearch(val: string) {
      // fetch remote data from here
      this.resetSelected();
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocused(e){
      // do something when input is focused
    }

    selectedName() {
        return this.selectItem["name"];
    }
    selectedArtist() {
        return this.selectItem["artist"];
    }
    selectedYear() {
        return this.selectItem["year"];
    }

    selectedFilelocation() {
        return this.selectItem["filelocation"];
    }

    getScriptsOfAnExhibition(_id: string) {
        return this.model.getScriptsOfAnExhibition(_id);
    }
}
