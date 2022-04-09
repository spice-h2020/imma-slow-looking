export class Stage {
    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title?: string,
        public stagetype?: string,
        public includeartworks: Array<string> = [],
        public body?: any
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
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
    }
}

export class statementStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Statement goes here",
        public stagetype: string = "statement",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
    }
}

export class storyStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Story",
        public body: string = "The story stem should provide enough detail to get people started but open up many ways in which the story could develop.",
        public help: string = "The instructions could just ask people to complete the story or give more specific prompts such as write about what happens next or what happened before.",
        public stagetype: string = "story",
        public includeartworks: Array<string> = [],
    ) {
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
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
        super(type, id, position, title, stagetype, includeartworks, body);
    }
}