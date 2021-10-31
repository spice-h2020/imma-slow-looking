export class Stage {
    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public stagetype?: string,
        public includeartworks: Array<string> = [],
    ) {
    }
}

export class welcomeStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Welcome",
        public body: string = "Hello and welcome to this Deep Viewpoints activity.",
        public stagetype: string = "welcome",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class contextStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Contextual information goes here",
        public stagetype: string = "context",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class questionStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Question goes here",
        public help?: string,
        public stagetype: string = "question",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class multiquestionStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: Array<string> = ["First question goes here","Second question goes here"],
        public help?: string,
        public sequential: boolean = true,
        public stagetype: string = "multiquestion",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class shareWithMuseumStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Share with IMMA",
        public body: string = "Do you give IMMA permission to share your responses anonymously online, including social media?",
        public share: boolean = true,
        public stagetype: string = "shareWithMuseum",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class followStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Keep in touch",
        public body: string = "Would you like to receive a link to your Deep Viewpoints activity via email? If so, enter your email address.",
        public stagetype: string = "follow",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class shareWithSomeoneStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Share with someone",
        public body: string = "Would you like to share your response with someone such as friend or family member? " +
        "If so, enter their email address and a message. " +
        "Remember to include your name in the message so they know who sent it",
        public stagetype: string = "shareWithSomeone",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}

export class thankyouStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Thankyou",
        public body: string = "Thankyou for taking part in this Deep Viewpoints activity. Press the button below to save your response.",
        //  + "Share the activity over social media. This shares the activity, not your own response to it.",
        public stagetype: string = "thankyou",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, stagetype, includeartworks);
    }
}