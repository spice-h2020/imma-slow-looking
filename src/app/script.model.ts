import { Artwork } from "./artwork.model";
import { Stage } from "./stage.model";
import { Theme } from "./theme.model";

export class Script {
    constructor (
        public id?: number,
        public name?: string,
        public themes?: Array<Theme>,
        public artwork?: Artwork,
        public open?: boolean,
        public visible?: boolean,
        public stages?: Array<Stage>
    ) {}
}