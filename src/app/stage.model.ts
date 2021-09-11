export class Stage {
    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public stagetype?: string
    ) {
    }
}

export class welcomeStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Welcome",
        public body: string = "Hello and welcome to this Slow Looking activity.",
        public stagetype: string = "welcome",
    ) {
        super(type, id, position, stagetype);
    }
}

export class contextStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Contextual information goes here",
        public stagetype: string = "context"
    ) {
        super(type, id, position, stagetype);
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
        public stagetype: string = "question"
    ) {
        super(type, id, position, stagetype);
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
        public stagetype: string = "shareWithMuseum"
    ) {
        super(type, id, position, stagetype);
    }
}

export class followStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Keep in touch",
        public body: string = "Would you like to receive a link to your Slow Looking activity via email? If so, enter your email address.",
        public stagetype: string = "follow"
    ) {
        super(type, id, position, stagetype);
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
        public stagetype: string = "shareWithSomeone"
    ) {
        super(type, id, position, stagetype);
    }
}

export class thankyouStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Thankyou",
        public body: string = "Thankyou for taking part in this Slow Looking activity. " +
        "Share the activity over social media. This shares the activity, not your own response to it.",
        public stagetype: string = "thankyou",
    ) {
        super(type, id, position, stagetype);
    }
}