import { Action } from "./action.model";
import { Script } from "./script.model";

export class Activity {
    constructor (
        public id?: number,
        public script?: Script,
        public actions?: Array<Action>,
        public approved?: boolean
    ) {}
}