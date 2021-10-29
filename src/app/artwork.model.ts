export class Artwork {
    constructor (
        public _id?: string,
        public type: string = "artwork",
        public id?: number,
        public name?: string,
        public artist?: string,
        public year?: string,
        public fileLocation?: string,
        public url?: string,
        public owner?: string
    ) {}
}