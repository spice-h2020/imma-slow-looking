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
    
    config = {
        headers: {
            Authorization: 'Basic xyz'
        }
    };
  }