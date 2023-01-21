export class ConfigSettings {
    citizenDatasetUUID: string = "11111111-2222-3333-4444-555555555555";

    collectionDatasetUUID: string = "11111111-2222-3333-4444-555555555555";

    collectionQuery: string = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns%23> " +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema%23> " +
    "SELECT ?artwork ?title ?creatorname ?artworkurl ?year " +
    "WHERE { " +
    "?artwork rdf:type <http://schema.org/CreativeWork> . " +
    "?artwork <https://w3id.org/arco/ontology/context-description/hasTitle> ?title . " +
    "?artwork <http://purl.org/dc/elements/1.1/creator> ?creator . " +
    "?creator <http://www.w3.org/2000/01/rdf-schema%23label> ?creatorname . " +
    "?artwork <http://schema.org/image> ?image . " +
    "?image <http://schema.org/url> ?artworkurl . " +
    "?artwork  <http://schema.org/dateCreated> ?year } ";

    //the base URL of the application
    baseURL: string = "http://localhost:4200/";
    
    config = {
        headers: {
            Authorization: 'Basic xyz'
        }
    };

    APIURL: string = "";

    userVariable: string = "usern";

    // text and banner configuration - IMMA
    banner_logo: string = "assets/img/IMMA-DV1.png";
    home_para1a: string = "Deep Viewpoints contains short ";
    home_para1b: string = "scripts";
    home_para1c: string = " that guide you through looking at and responding to artworks. Many of the scripts have been developed by citizen curators, providing a new perspective on the IMMA collection.";
    home_para2: string = "Scripts are organised into themes. Select a theme to begin. Tap on the artwork to start the script.";
    home_para3a: string = "As well as taking part in the scripts you can also ";
    home_para3b: string = "view the responses of others";
    home_para3c: string = ". Responses are pre-moderated before appearing on Deep Viewpoints.";
    overview_exhibitiondescription: string = "Scripts related to IMMA exhibitions";
    overview_artworkstitle: string = "Artworks";
    overview_artworkssearchprompt: string = "Search artworks:";
    overview_artworksdescription: string = "Scripts related to works from the IMMA collection";
    overview_para1a: string = "Deep Viewpoints contains short ";
    overview_para1b: string = "scripts";
    overview_para1c: string = " that guide you through looking at and responding to artworks. Many of the scripts have been developed by citizen curators, providing a new perspective on the IMMA collection.";
    overview_para2: string = "As well as taking part in the scripts you can also view the responses of others. Responses are pre-moderated before appearing on Deep Viewpoints.";
    overview_searchplaceholder: string = "Artwork, artist or year";
    otherPeople_para1: string = "Find out how others have responded to Deep Viewpoints scripts.";
    otherPeople_para2: string = "Scripts are organised into themes. Select a theme to begin. Recent responses are shown for each script. Responses are pre-moderated before appearing on Deep Viewpoints.";
    otherPeople_para3a: string = "You can also ";
    otherPeople_para3b: string = "take part in the scripts";
    otherPeople_para3c: string = " for yourself."
    artworks_para1: string = "Manage the collection of artworks that can be used in your scripts.";
    artworks_searchprompt: string = "Search IMMA collection:";
    artworks_searchplaceholder: string = "Artwork, artist or year";
    navbar_text: string = "IMMA Deep Viewpoints";
    navbar_menu5: string = "Artworks";
    translations: {code: string, route: string}[] = [];
  }