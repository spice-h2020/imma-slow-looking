export class Question {
    constructor (
        public type: string = "question",
        public title?: string,
        public choice: boolean = false,
        public options: Array<string> = []
    ) {
    }
}