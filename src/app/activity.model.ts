import { Action } from "./action.model";
import { Script } from "./script.model";

export class Activity {
    constructor (
        public _id?: string,
        public type: string = "activity",
        public id?: number,
        public script?: Script,
        public actions?: Array<Action>,
        public approved?: boolean,
        public editor?: string,
        public author?: string,
        public authorname?: string,
        public likes: number = 0
    ) {}
}