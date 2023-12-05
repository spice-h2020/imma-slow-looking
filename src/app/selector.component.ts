import { Component, OnInit } from "@angular/core";
import { CurrentUser } from "./currentUser.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Model } from "./repository.model";
import { ScriptSet } from "./scriptSet.model";
import { Script } from "./script.model";


@Component({
    selector: "paSelector",
    templateUrl: "selector.component.html"
})

export class SelectorComponent implements OnInit {

    constructor(
        public currentuser: CurrentUser, 
        private activatedRoute: ActivatedRoute,
        private model: Model,
        private router: Router
    ) { } 

    ngOnInit() {

        let _id = this.activatedRoute.snapshot.params.id;

        let returnparam:string = null;

        this.activatedRoute.queryParams
        .subscribe(params => {
            returnparam = params.return;
        }
        );

        let scriptsets: ScriptSet[] = this.activatedRoute.snapshot.data.model7;

        //get the _id from ScriptSet
        let ind = scriptsets.findIndex(x => x._id == _id)

        //get the list of scripts
        if(ind > -1) {
            this.scriptids = scriptsets[ind].scriptids;
            this.scriptset = _id;

            //pick one randomly
            let randomNumber = this.randomInt(0, this.scriptids.length-1);

            //go to it
            if(returnparam) {
                this.router.navigate(['slowLooking',this.scriptids[randomNumber]],{queryParams: {return:'end'}});
            }
            else {
                this.router.navigate(['slowLooking',this.scriptids[randomNumber]]);
            }

        }

    }

    showup() {
        window.scroll(0,0);
    }

    randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    scriptset: string = null;
    scriptids: string[] = [];

}