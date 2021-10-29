export class User {
    constructor (
        public _id?: string,
        public id?: number,
        public type: string = 'user',
        public username?: string,
        public password?: string
    ) {}
}