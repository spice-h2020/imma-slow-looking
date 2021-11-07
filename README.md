# Deep Viewpoints

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Configuring Deep Viewpoints to work with the SPICE Linked Data Hub

Copy the file `src/app/config.example.ts` to `src/app/config.ts`

This file contains the configuration settings for the application.

__citizenDatasetUUID__: This should contain the UUID for the dataset where you will store and retrieve the citizen contributions.

__collectionDatasetUUID__: This should contain the UUID for the dataset where you will access the museum collection used in the app.

__collectionQuery__: This should contain the SPARQL query for retrieving artworks from the museum collection. For each artwork, the query should return values for the following variables as strings:

* __?title__ (the title of the artwork)

* __?creatorname__ (the creator/artist of the artwork)

* __?artworkurl__ (the URL of the image file for the artwork)

* __?year__ (the year/time period that the artwork was created)


__config__: This should contain your authorisation string for accessing the SPICE Linked Data Hub.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
