import { Artwork } from "./artwork.model";

export class Exhibition {
    constructor (
        public _id?: string,
        public type: string = "exhibition",
        public name?: string,
        public description?: string,
        public url?: string,
        public artwork?: {name: string, artist: string, year: string, url: string}
    ) {}
}