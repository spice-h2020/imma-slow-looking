export class ScriptSet {
    constructor (
        public _id?: string,
        public type: string = "scriptset",
        public name: string = "",
        public scriptids: Array<string> = [],
        public description: string = "",
        public owner: string = ""
    ) {}
}