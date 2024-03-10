import { Component, OnInit } from "@angular/core";
import { Artwork } from "./artwork.model";
import { ConfigSettings } from "./config";
import { CurrentUser } from "./currentUser.service";
import { Model } from "./repository.model";


@Component({
    selector: "paArtworkTable",
    templateUrl: "artworkTable.component.html"
})

export class ArtworkTableComponent implements OnInit {


    artistStartList: {text: string}[];
    artworkStartList: {text: string}[]
    yearStartList: {text: string}[];

    artistStartListArchive: {text: string}[];
    artworkStartListArchive: {text: string}[]
    yearStartListArchive: {text: string}[];

    public handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/img/488199.png';
    }

    ngOnInit() {
        // let artworks: Artwork[]  = this.activatedRoute.snapshot.data.model2;

        //facets for my collection
        this.artistStartList = this.uniqByMap(this.getArtworks().map(x => x.artist)).map(x => ({text: x}));
        this.artworkStartList = this.uniqByMap(this.getArtworks().map(x => x.name)).map(x => ({text: x}));
        this.yearStartList = this.uniqByMap(this.getArtworks().map(x => x.year)).map(x => ({text: x}));

        //facets for acrchive collection 
        this.artistStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.artist)).map(x => ({text: x}));
        this.artworkStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.name)).map(x => ({text: x}));
        this.yearStartListArchive = this.uniqByMap(this.model.getCollection().map(x => x.year)).map(x => ({text: x}));
    }

    getCollection() {
        return this.model.getCollection();
    }

    artworkAddedAlert: string  = "";

    //holding facet selections when moving between tabs
    artistField = '';
    artworkField = '';
    yearField = '';
    artistArchiveField = '';
    artworkArchiveField = '';
    yearArchiveField = '';


    // configuration settings
    configSettings = new ConfigSettings;

    deleteConfirmation_Id = "";

    confirmDelete(_id: string) {
        this.deleteConfirmation_Id = _id;
    }

    placeholderText = this.configSettings.artworks_searchplaceholder;
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
        return this.selectItem["year"];
    }
    selectedURL() {
        return this.selectItem["filelocation"];
    }
    keyword = 'searchstring';
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
        this.reloadArtworks()
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


    constructor(public currentuser: CurrentUser, private model: Model){}

    getArtworks() {
        let artworks =  this.model.getArtworks();

        // filter artworks for login
        let filteredArtworks = this.filterArtworksForLogin(artworks);

        let sortedArtworks = filteredArtworks.sort((a, b) => (a.artist < b.artist) ? -1 : 1);
        
        return sortedArtworks;
    }

    filterArtworksForLogin(artworks: Artwork[]): Artwork[] {
        let user = this.currentuser.getUser();
        let userID = user.id;

        if (userID == 0) {
            return [];
        }

        let filteredArtworks = artworks.filter(x => x.owner == user._id);
        return filteredArtworks;
    }

    artworkAlreadyAdded(filelocation) {
        if(this.getArtworks().find(x => x.url == filelocation)) {
            return true;
        }
        else {
            return false;
        }

    }

    saveArtworkFromParameters(name:string="", artist:string="", year:string="", url:string="") {
        let artwork: Artwork = {type: "artwork", name: name, artist: artist, year: year, url: url};

        //add current user_ID as owner
        let user_ID = this.currentuser.getUser()._id;
        artwork.owner = user_ID;

        let currentArtworksOfLogin = this.getArtworks();
        if(!(currentArtworksOfLogin.find(x => x.owner == artwork.owner && x.url == artwork.url))) {
            this.model.saveArtwork(artwork);
        }
    }

    saveArtwork() {
        let artwork: Artwork = {type: "artwork", name: this.selectItem["name"], 
        artist: this.selectItem["artist"], year: this.selectItem["year"], url: this.selectItem["filelocation"]};

        //add current user_ID as owner
        let user_ID = this.currentuser.getUser()._id;
        artwork.owner = user_ID;

        let currentArtworksOfLogin = this.getArtworks();
        if(!(currentArtworksOfLogin.find(x => x.owner == artwork.owner && x.url == artwork.url))) {
            this.model.saveArtwork(artwork);
        }
    }

    deleteArtwork(_id: string) {
        //delete artwork from scripts
        let scripts = this.model.getScriptsOfAnArtwork(_id);
        this.model.removeArtworkFromScripts(scripts, _id);

        //delete artwork
        this.model.deleteArtwork(_id);
    }

    isLoggedIn() {
        return this.currentuser.getUserID() != undefined;
    }

    reloadArtworks() {
        this.model.refreshArtworks();
    }

    getScriptsOfAnArtwork(_id: string) {
        return this.model.getScriptsOfAnArtwork(_id);
    }

    uniqByMap<T>(array: T[]): T[] {
        const map = new Map();
        for (const item of array) {
            map.set(item, item);
        }
        return Array.from(map.values());
    }

    // *********my collection search
    searchCollectionText = "";
    searchCollectionDisplayLimit = 12;


    //selections from selection and events
    artistSelected: string = null;
    artworkSelected: string = null;
    yearSelected: string = null;

    artistSelectedArchive: string = null;
    artworkSelectedArchive: string = null;
    yearSelectedArchive: string = null;

    //**********archive search interface
    searchText = "";
    searchDisplayLimit = 12;

    //////////my collection facets
    keywordArtist = 'text';
    keywordYear = 'text';
    keywordArtwork = 'text';

    selectEventArtist(item: {text: string}) {
        this.artistSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }

    onChangeSearchArtist(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onFocusedArtist(e) {
    // do something
    }

    inputClearedArtist(e) {
        this.artistSelected = null;
        this.recaluateNameLists();
    }

    selectEventArtwork(item: {text: string}) {
        this.artworkSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
  
    onChangeSearchArtwork(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocusedArtwork(e) {
        // do something
    }

    inputClearedArtwork(e) {
        this.artworkSelected = null;
        this.recaluateNameLists();
    }

    selectEventYear(item: {text: string}) {
        this.yearSelected = item.text;
        // do something with selected item
        this.recaluateNameLists();
    }
      
    onChangeSearchYear(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedYear(e) {
    // do something
    }
    
    inputClearedYear(e) {
        this.yearSelected = null;
        this.recaluateNameLists();
    }

    //////////archive facets
    keywordArtistArchive = 'text';
    keywordYearArchive = 'text';
    keywordArtworkArchive = 'text';

    selectEventArtistArchive(item: {text: string}) {
        this.artistSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }

    onChangeSearchArtistArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onFocusedArtistArchive(e) {
    // do something
    }

    inputClearedArtistArchive(e) {
        this.artistSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    selectEventArtworkArchive(item: {text: string}) {
        this.artworkSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
  
    onChangeSearchArtworkArchive(search: string) {
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
    }
  
    onFocusedArtworkArchive(e) {
        // do something
    }

    inputClearedArtworkArchive(e) {
        this.artworkSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    selectEventYearArchive(item: {text: string}) {
        this.yearSelectedArchive = item.text;
        // do something with selected item
        this.recaluateNameListsArchive();
    }
      
    onChangeSearchYearArchive(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }
      
    onFocusedYearArchive(e) {
    // do something
    }
    
    inputClearedYearArchive(e) {
        this.yearSelectedArchive = null;
        this.recaluateNameListsArchive();
    }

    //reloading the shown results based on facet selection
    filteredResults() {
        let results = this.getArtworks().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionText.toLowerCase())});
    
        if(this.artistSelected) {
            results = results.filter(x => x.artist == this.artistSelected);
        }
        if(this.artworkSelected) {
            results = results.filter(x => x.name == this.artworkSelected);
        }
        if(this.yearSelected) {
            results = results.filter(x => x.year == this.yearSelected);
        }
        return results;
    }

    filteredResultsArchive() {
        let results = this.model.getCollection().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchText.toLowerCase())});
    
        if(this.artistSelectedArchive) {
            results = results.filter(x => x.artist == this.artistSelectedArchive);
        }
        if(this.artworkSelectedArchive) {
            results = results.filter(x => x.name == this.artworkSelectedArchive);
        }
        if(this.yearSelectedArchive) {
            results = results.filter(x => x.year == this.yearSelectedArchive);
        }
        return results;
    }

    recaluateNameLists() {
        let results = this.filteredResults().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionText.toLowerCase())});

        let artistNameList: {text: string}[] = this.uniqByMap(results.map(x => x.artist)).map(x => ({text: x}));
        this.artistStartList = [... artistNameList];

        let artworkNameList: {text: string}[] = this.uniqByMap(results.map(x => x.name)).map(x => ({text: x}));
        this.artworkStartList = [... artworkNameList];

        let yearNameList: {text: string}[] = this.uniqByMap(results.map(x => x.year)).map(x => ({text: x}));
        this.yearStartList = [... yearNameList];
    }

    recaluateNameListsArchive() {
        let results = this.filteredResultsArchive().filter(it => {
            return (it.name+it.artist+it.year).toLowerCase().includes(this.searchCollectionText.toLowerCase())});

        let artistNameList: {text: string}[] = this.uniqByMap(results.map(x => x.artist)).map(x => ({text: x}));
        this.artistStartListArchive = [... artistNameList];

        let artworkNameList: {text: string}[] = this.uniqByMap(results.map(x => x.name)).map(x => ({text: x}));
        this.artworkStartListArchive = [... artworkNameList];

        let yearNameList: {text: string}[] = this.uniqByMap(results.map(x => x.year)).map(x => ({text: x}));
        this.yearStartListArchive = [... yearNameList];
    }


}