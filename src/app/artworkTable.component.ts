import { Component } from "@angular/core";
import { Artwork } from "./artwork.model";
import { Model } from "./repository.model";


@Component({
    selector: "paArtworkTable",
    templateUrl: "artworkTable.component.html"
})

export class ArtworkTableComponent {

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    placeholderText = "Artwork name";
    selected: boolean = false;
    selectItem: Array<any> = [];

    selectedArtworkLabel() {
        return this.selectItem["name"] + ", " + this.selectItem["artist"] + ", " + this.selectItem["year"];
    }

    selectedName() {
        return this.selectItem["name"];
    }
    selectedArtist() {
        return this.selectItem["artist"];
    }
    selectedYear() {
        return this.selectItem["year"]
    }
    selectedURL() {
        return this.selectItem["filelocation"];
    }
    keyword = 'name';
    data = this.model.getCollection();

    // data for testing
    // data = [
    //     {name: "Jacob’s Dream", artist: "Patrick Hall", year: "2002", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1551.jpg"},
    //     {name: "Tarot Set", artist: "Ulla von Brandenburg", year: "2008", filelocation: "https://imma.ie/wp-content/uploads/2018/11/2260.jpg"},
    //     {name: "Patrick Hall", artist: "Nick Miller", year: "1994", filelocation: "https://imma.ie/wp-content/uploads/2018/11/487.jpg"},
    //     {name: "Burning Tree", artist: "Patrick Hall", year: "2006", filelocation: "https://imma.ie/wp-content/uploads/2021/03/33.jpg"},
    //     {name: "Sphère-Trame", artist: "François Morellet", year: "1962", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1989.jpg"},
    //     {name: "Ancestors", artist: "Patrick Hall", year: "1991", filelocation: "https://imma.ie/wp-content/uploads/2018/11/911.jpg"},
    //     {name: "Rising of Faust", artist: "Patrick Hall", year: "1996", filelocation: "https://imma.ie/wp-content/uploads/2018/11/1066.jpg"}
    // ];
  
  
    selectEvent(item) {
      // do something with selected item
      this.selected = true;
      this.selectItem = item;

    }
  
    onChangeSearch(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocused(e){
      // do something when input is focused
    }


    constructor(private model: Model){}

    getArtworks() {
        let artworks =  this.model.getArtworks();
        let sortedArtworks = artworks.sort((a, b) => (a.id > b.id) ? -1 : 1);
        return sortedArtworks;
    }

    saveArtwork() {
        let artwork: Artwork = {type: "artwork", name: this.selectItem["name"], 
        artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"]};
        this.model.saveArtwork(artwork);
    }

    deleteArtwork(_id: string) {
        //delete artwork from scripts
        let scripts = this.model.getScriptsOfAnArtwork(_id);
        this.model.removeArtworkFromScripts(scripts, _id);

        //delete artwork
        this.model.deleteArtwork(_id);
    }

}