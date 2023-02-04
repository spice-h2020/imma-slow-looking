import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Gallery, GalleryItem, GalleryRef, ImageItem } from "ng-gallery";
import { Lightbox } from "ng-gallery/lightbox";
import { questionanswer } from "./action.model";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { ConfigSettings } from "./config";
import { Model } from "./repository.model";
import { Script } from "./script.model";


@Component({
    selector: "paAllResponses",
    templateUrl: "allResponses.component.html"
})

export class AllResponsesComponent implements OnInit {

    constructor(
        private model: Model,
        private activatedRoute: ActivatedRoute,
        public gallery: Gallery,
        public lightbox: Lightbox
        ){}

    // configuration settings
    configSettings = new ConfigSettings;

    slowLookingScript = "0";

    currentScriptImages: GalleryItem[] = [];

    lightboxGalleryRef: GalleryRef;

    ngOnInit() {
        let _id = this.activatedRoute.snapshot.params.id;

        // set script id
        this.slowLookingScript = _id;

        let scripts: Script[] = this.activatedRoute.snapshot.data.model1;

        let artworks: Artwork[]  = this.activatedRoute.snapshot.data.model2;

        let SLscript = scripts.find(x => x._id == _id);

        if(SLscript != undefined) {
            //set lightbox images
            if(SLscript.artworkids.length > 0) {
                for(var artworkid of this.getUsedArtworkIds(SLscript)) {
                    let artworkindex = artworks.findIndex(x => x._id == artworkid);
                    if(artworkindex > -1) {
                        this.currentScriptImages.push(new ImageItem({src: artworks[artworkindex].url, thumb: artworks[artworkindex].url}));
                    }
                }
                this.lightboxGalleryRef = this.gallery.ref(_id);

                this.lightboxGalleryRef.load(this.currentScriptImages);
            }
        }

    }

    startLightbox(url: string) {
        //find url position in gallery
        let ind = this.currentScriptImages.findIndex(x => x.data.src == url);
        if(ind > -1) {
            this.openLightbox(ind);
        }
    }

    openLightbox(index: number) {
        if(this.slowLookingScript != "0") {
            this.lightbox.open(index, this.slowLookingScript);
        }
    }

    getUsedArtworkIds(script: Script) {
        let usedArtworkIds: string[];
        if(script.homepageartworkid) {
            usedArtworkIds = [script.homepageartworkid];
        }
        else {
            usedArtworkIds = [];
        }
        if(script.stages) {
            for(var stage of script.stages) {
                for(var stageArtworkId of stage.includeartworks) {
                    if(!usedArtworkIds.includes(stageArtworkId)) {
                        usedArtworkIds.push(stageArtworkId);
                    }
                }
            }
        }
        return usedArtworkIds;
    }

    getScript(_id: string): Script {
        return this.model.getScript(_id);
    }

    getScriptsOfScriptID(_id: string) {
        return [this.model.getScript(_id)];
    }

    getArtworkFromId(artworkId: string) {
        return [this.getArtwork(artworkId)];
    }

    getArtwork(_id: string) {
        return this.model.getArtwork(_id);
    }

    getApprovedActivitiesOfAScript(_id: string): Activity[] {
        let activities = this.model.getApprovedActivitiesOfAScript(_id);
        return activities.sort((a, b) => (a.id > b.id) ? -1 : 1);
    }

    addLikeToActivity(activity: Activity) {
        activity.likes = activity.likes+1;
        this.model.saveActivity(activity);
    }

    getNonHomepageArtworksOfScript(script: Script) {
        let usedArtworks: Artwork[] = [];
        if(script.stages) {
            for(var stage of script.stages) {
                for(var stageArtworkId of stage.includeartworks) {
                    if(!usedArtworks.find(x => x._id == stageArtworkId) && stageArtworkId != script.homepageartworkid) {
                        let artwork = this.getArtwork(stageArtworkId);
                        if(artwork != undefined) {
                            usedArtworks.push(artwork);
                        }
                    }
                }
            }
        }
        return usedArtworks;
    }


    sortAnswers(answers: questionanswer[]) {
        return answers.sort((a1, a2) => {if(a1.question > a2.question) {return 1;} else {return -1;}})
    }
    
}