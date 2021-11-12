import { Stage } from "./stage.model";

export class Script {
    constructor (
        public _id?: string,
        public type: string = "script",
        public id?: number,
        public name?: string,
        public themeids?: Array<string>,
        public artworkids?: Array<string>,
        public homepageartworkid?: string,
        public open?: boolean,
        public visible?: boolean,
        public stages?: Array<Stage>,
        public author?: string,
        public archived: boolean = false,
        public owner?: string,
        public autoapproved: boolean = false,
        public description: string = "A short description of what the activity is about, what will it involve, why people should take part"
    ) {}
}