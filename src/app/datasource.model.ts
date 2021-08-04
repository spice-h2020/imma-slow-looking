import { Action, questionAction } from "./action.model";
import { Activity } from "./activity.model";
import { Artwork } from "./artwork.model";
import { Script } from "./script.model";
import { contextStage, followStage, questionStage, shareWithMuseumStage, shareWithSomeoneStage, Stage, thankyouStage, welcomeStage } from "./stage.model";
import { Theme } from "./theme.model";


// @Injectable()
export class StaticDataSource {

    private themeData: Theme[];
    private artworkData: Artwork[];
    private scriptData: Script[];
    private activityData: Activity[];

    constructor() {
        this.themeData = new Array<Theme>(
            new Theme(1, "Family", "What are the different meanings of family? How do families change over time and place? What is the role of family within society?"),
            new Theme(2, "The Past", "How does the past influence how we live today? How does the present change what we think of the past?"),
            new Theme(3, "Storytelling", "Why do sories become connected to physical objects? Why do people tell them? How can artworks inspire new stories? "),
            new Theme(4, "LGBTQ+", "What can artworks tell us about the life of LGBTQ+ people? What are some of the LGBTQ+ perspectives on IMMA artworks?"),
            new Theme(5, "Black and Irish", "What does it mean to be Black and Irish? What are some of the Black and Irish perspectives on IMMA artworks?"),
        );
        
        this.artworkData = new Array<Artwork>(
            new Artwork(1, "Saddle", "Dorothy Cross", "1993", "assets/img/saddle.jpg"),
            new Artwork(2, "Barrel", "Fergus Martin", "2020", "assets/img/barrel.jpg"),
            new Artwork(3, "The Drummer", "Barry Flanagan", "1996", "assets/img/drummer.jpg"),
            new Artwork(4, "Back of Snowman", "Gary Hume", "2003", "assets/img/snowman.jpg"),
            new Artwork(5, "8 Limestones cut to a specific size from rough blocks 150 x 50 x 50cm split into parts and reassembled into their original form", "Ulrich Rückriem ", "1988", "assets/img/limestones.jpg"),
        );
        
        this.scriptData = new Array<Script>(
            new Script(1, "Slow Looking at Saddle", new Array<Theme>(this.themeData[0], this.themeData[1], this.themeData[2], this.themeData[3], this.themeData[4]), this.artworkData[0], true, true,
            new Array<Stage>(
                new welcomeStage(1, 1, "Saddle", "Hello and welcome to the IMMA Slow Looking Series. " +
                    "My name is Paola and I'm going to share some time exploring an artwork from the IMMA Collection with you. " +
                    "So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work. "),
                new contextStage(2, 2, "Saddle", "So we can allow our eyes to wander over the piece. " +
                    "Nice and slowly, from top to bottom, from left to right. " + 
                    "Nearly like we're writing an inventory, or a list of what we see. " +
                    "We keep it simple, just noticing colours, materials, shapes. " +
                    "There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this object. " +
                    "As this is a sculptural work, you are able to move around and examine it closely."),
                new questionStage(3, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "Here are some words that might help you with your response: " +
                    "saddle, chair, udder, stirrups, leather, horse"),
                new questionStage(4, 4, "What would you make?", 
                    "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                    "Think of a personal possession you would save if there was a fire. " +
                    "Think of an object you recieved as a gift from a friend or family member. " +
                    "Can you put them together?"),
                new shareWithMuseumStage(5, 5),
                new followStage(6, 6),
                new shareWithSomeoneStage(7, 7),
                new thankyouStage(8, 8)
                )
            ),
            new Script(2, "Slow Looking at Barrel", new Array<Theme>(this.themeData[0], this.themeData[2]), this.artworkData[1], true, true,
                new Array<Stage>(
                    new welcomeStage(9, 1, "Barrel", "Hello and welcome to the IMMA Slow Looking Series. " +
                        "My name is Paola and I'm going to share some time exploring an artwork from the IMMA Collection with you. " +
                        "So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work. "),
                    new contextStage(10, 2, "Barrel", "So we can allow our eyes to wander over the piece. " +
                        "Nice and slowly, from top to bottom, from left to right. " + 
                        "Nearly like we're writing an inventory, or a list of what we see. " +
                        "We keep it simple, just noticing colours, materials, shapes. " +
                        "There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this object. " +
                        "As this is a sculptural work, you are able to move around and examine it closely."),
                    new questionStage(11, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                        "What is our attention drawn to first? What is this sculpture made of? " +
                        "Are there several parts to it? What materials do you see?"),
                    new shareWithMuseumStage(12, 5),
                    new followStage(13, 6),
                    new shareWithSomeoneStage(14, 7),
                    new thankyouStage(15, 8)
                )
            ),
            new Script(3, "Slow Looking at The Drummer", new Array<Theme>(this.themeData[0], this.themeData[3]), this.artworkData[2], false, true,
                new Array<Stage>(
                    new welcomeStage(16, 1, "The Drummer", "Hello and welcome to the IMMA Slow Looking Series. " +
                        "My name is Paola and I'm going to share some time exploring an artwork from the IMMA Collection with you. " +
                        "So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work. "),
                    new contextStage(17, 2, "The Drummer", "So we can allow our eyes to wander over the piece. " +
                        "Nice and slowly, from top to bottom, from left to right. " + 
                        "Nearly like we're writing an inventory, or a list of what we see. " +
                        "We keep it simple, just noticing colours, materials, shapes. " +
                        "There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this object. " +
                        "As this is a sculptural work, you are able to move around and examine it closely."),
                    new questionStage(18, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                        "What is our attention drawn to first? What is this sculpture made of? " +
                        "Are there several parts to it? What materials do you see?"),
                    new shareWithMuseumStage(19, 5),
                    new followStage(20, 6),
                    new shareWithSomeoneStage(21, 7),
                    new thankyouStage(22, 8)
                )
            ),
            new Script(4, "Slow Looking at Back of Snowman", new Array<Theme>(this.themeData[0], this.themeData[4]), this.artworkData[3], true, false,
                new Array<Stage>(
                    new welcomeStage(23, 1, "Back of Snowman", "Hello and welcome to the IMMA Slow Looking Series. " +
                        "My name is Paola and I'm going to share some time exploring an artwork from the IMMA Collection with you. " +
                        "So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work. "),
                    new contextStage(24, 2, "Back of Snowman", "So we can allow our eyes to wander over the piece. " +
                        "Nice and slowly, from top to bottom, from left to right. " + 
                        "Nearly like we're writing an inventory, or a list of what we see. " +
                        "We keep it simple, just noticing colours, materials, shapes. " +
                        "There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this object. " +
                        "As this is a sculptural work, you are able to move around and examine it closely."),
                    new questionStage(25, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                        "What is our attention drawn to first? What is this sculpture made of? " +
                        "Are there several parts to it? What materials do you see?"),
                    new shareWithMuseumStage(26, 5),
                    new followStage(27, 6),
                    new shareWithSomeoneStage(28, 7),
                    new thankyouStage(29, 8)
                )
            ),
        );

        this.activityData = new Array<Activity>(
            new Activity(1, this.scriptData[0], new Array<Action>(
                new questionAction(new questionStage(3, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?", "Here are some words that might help you with your response: " +
                    "saddle, chair, udder, stirrups, leather, horse", "question"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "There are legs below the saddle but not horse's legs"),
                new questionAction(new questionStage(4, 4, "What would you make?", 
                "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                "Think of a personal possession you would save if there was a fire. " +
                "Think of an object you recieved as a gift from a friend or family member. " +
                "Can you put them together?"), 4, 
                    "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                    "I would combine a toaster with a radio")
                ), 
                true
            ),
            new Activity(2, this.scriptData[0], new Array<Action>(
                new questionAction(new questionStage(3, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?", "Here are some words that might help you with your response: " +
                    "saddle, chair, udder, stirrups, leather, horse", "question"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "There are udders sticking out of the saddle"),
                new questionAction(new questionStage(4, 4, "What would you make?", 
                "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                "Think of a personal possession you would save if there was a fire. " +
                "Think of an object you recieved as a gift from a friend or family member. " +
                "Can you put them together?"), 4, 
                    "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                    "I would combine a vase with a lamp")
                ), 
                true
            ), 
            new Activity(3, this.scriptData[0], new Array<Action>(
                new questionAction(new questionStage(3, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?", "Here are some words that might help you with your response: " +
                    "saddle, chair, udder, stirrups, leather, horse", "question"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "It would feel strange to the touch"),
                new questionAction(new questionStage(4, 4, "What would you make?", 
                "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                "Think of a personal possession you would save if there was a fire. " +
                "Think of an object you recieved as a gift from a friend or family member. " +
                "Can you put them together?"), 4, 
                    "If you were given the chance of making a sculpture by mixing two or more everyday objects, would you want to do so?",
                    "I would combine a desk with a slide")
                ), 
                false
            ),  
            new Activity(4, this.scriptData[3], new Array<Action>(
                new questionAction(new questionStage(25, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                "What is our attention drawn to first? What is this sculpture made of? " +
                "Are there several parts to it? What materials do you see?"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "Two cannon balls."),
                ), 
                true
            ),
            new Activity(5, this.scriptData[2], new Array<Action>(
                new questionAction(new questionStage(18, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                "What is our attention drawn to first? What is this sculpture made of? " +
                "Are there several parts to it? What materials do you see?"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "A giant hare with a drum."),
                ), 
                true
            ),              
        );

    }

    getThemeData(): Theme[] {
        return this.themeData;
    }

    getArtworkData(): Artwork[] {
        return this.artworkData;
    }

    getScriptData(): Script[] {
        return this.scriptData;
    }

    getActivityData(): Activity[] {
        return this.activityData;
    }

}
