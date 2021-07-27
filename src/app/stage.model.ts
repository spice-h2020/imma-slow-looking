export class Stage {
    constructor (
        public id?: number,
        public position?: number,
        public type?: string
    ) {
    }
}

export class welcomeStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Welcome",
        public body: string = "Hello and welcome to this Slow Looking activity.",
        public type: string = "welcome",
    ) {
        super(id, position, type);
    }
}

export class contextStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Contextual information goes here",
        public type: string = "context"
    ) {
        super(id, position, type);
    }
}

export class questionStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Title goes here",
        public body: string = "Question goes here",
        public help?: string,
        public type: string = "question"
    ) {
        super(id, position, type);
    }
}

export class shareWithMuseumStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Share with IMMA",
        public body: string = "Do you give IMMA permission to share your responses anonymously online, including social media?",
        public share: boolean = true,
        public type: string = "shareWithMuseum"
    ) {
        super(id, position, type);
    }
}

export class followStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Keep in touch",
        public body: string = "Would you like to receive a link to your SLow Looking activity via email?",
        public type: string = "follow"
    ) {
        super(id, position, type);
    }
}

export class shareWithSomeoneStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Share with someone",
        public body: string = "Would you like to share your response with someone such as friend or family member?" +
        "If so, enter their email address and a message" +
        "Remember to include your name in the message so they know who sent it",
        public type: string = "shareWithSomeone"
    ) {
        super(id, position, type);
    }
}

export class thankyouStage extends Stage {

    constructor (
        public id?: number,
        public position?: number,
        public title: string = "Thankyou",
        public body: string = "THankyou for taking part in this Slow Looking activity" +
        "Share the activity over social media. This shares the activity, not your own response to it.",
        public type: string = "thankyou",
    ) {
        super(id, position, type);
    }
}