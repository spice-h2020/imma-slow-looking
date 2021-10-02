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
        public archived: boolean = false
    ) {}
}