import { followStage, multiquestionStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, storyStage } from "./stage.model";

export class Action {
    constructor (
        public position?: number,
    ){}
}

export class questionAction extends Action {

    constructor (
        public questionStage?: questionStage,
        public position?: number,
        public question?: string,
        public answer?: string,
    ) {
        super(position);
    }
}

export class storyAction extends Action {

    constructor (
        public storyStage?: storyStage,
        public position?: number,
        public question?: string,
        public answer?: string,
    ) {
        super(position);
    }
}

export class questionanswer {

    constructor (
        public question?: number,
        public answer?: string
    ) {}

}

export class multiquestionAction extends Action {

    constructor (
        public questionStage?: multiquestionStage,
        public position?: number,
        public questions?: Array<string>,
        public answers: Array<questionanswer> = [],
    ) {
        super(position);
    }
}

export class shareWithMusemAction extends Action {

    constructor (
        public shareWithMuseumStage?: shareWithMuseumStage,
        public position?: number,
        public share: boolean = true
    ) {
        super(position);
    }
}

export class followAction extends Action {

    constructor (
        public followStage?: followStage,
        public position?: number,
        public emailAddress?: string,
        public follow?: boolean,
    ) {
        super(position);
    }
}

export class shareWithFriendAction extends Action {

    constructor (
        public shareWithOtherStage?: shareWithSomeoneStage,
        public position?: number,
        public share?: boolean,
        public emailAddress?: string,
        public message?: string
    ) {
        super(position);
    }
}