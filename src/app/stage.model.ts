import { Question } from "./question.model";

export class Stage {
    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title?: string,
        public stagetype?: string,
        public includeartworks: Array<string> = [],
        public body?: any,
        public shuffle: boolean = false,
        public required: boolean = false
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
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}

export class contextStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "",
        public body: string = "Contextual information goes here",
        public stagetype: string = "context",
        public includeartworks: Array<string> = [],
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}

export class statementStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "",
        public body: string = "Statement goes here",
        public stagetype: string = "statement",
        public includeartworks: Array<string> = [],
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}

export class questionStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Question",
        public body: string = "Question goes here",
        public question: Question = {type: "question", title: "Question goes here", choice: false, multiselect: false, options: []},
        public help?: string,
        public stagetype: string = "question",
        public includeartworks: Array<string> = [],
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}

export class storyStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Story",
        public body: string = "Story stem goes here",
        public help: string = "Please read and complete the following story: ",
        public stagetype: string = "story",
        public includeartworks: Array<string> = [],
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}

export class multiquestionStage extends Stage {

    constructor (
        public type: string = "stage",
        public id?: number,
        public position?: number,
        public title: string = "Questions",
        public body: Array<string> = ["First question goes here","Second question goes here"],
        public questions: Array<Question> = [{type: "question", title: "First question goes here", choice: false, multiselect: false, options: []},
        {type: "question", title: "Second question goes here", choice: false, multiselect: false, options: []}],
        public help: string = "Try as many of the following questions as you like.",
        public sequential: boolean = true,
        public stagetype: string = "multiquestion",
        public includeartworks: Array<string> = [],
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
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
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
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
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
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
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
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
        public shuffle: boolean = false,
        public required: boolean = false
    ) {
        super(type, id, position, title, stagetype, includeartworks, body, shuffle, required);
    }
}