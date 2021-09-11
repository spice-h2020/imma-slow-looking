import { Stage } from "./stage.model";

export class Script {
    constructor (
        public _id?: string,
        public type: string = "script",
        public id?: number,
        public name?: string,
        public themeids?: Array<string>,
        public artworkid?: string,
        public open?: boolean,
        public visible?: boolean,
        public stages?: Array<Stage>
    ) {}
}