export class Theme {
    constructor (
        public _id?: string,
        public id?: number,
        public type: string = 'theme',
        public name?: string,
        public description?: string,
        public owner?: string
    ) {}
}