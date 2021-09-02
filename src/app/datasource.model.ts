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
    private stageData: Stage[];

    constructor() {
        // this.themeData = new Array<Theme>(
        //     new Theme(1, "Family", "What are the different meanings of family? How do families change over time and place? What is the role of family within society?"),
        //     new Theme(2, "The Past", "How does the past influence how we live today? How does the present change what we think of the past?"),
        //     new Theme(3, "Storytelling", "Why do sories become connected to physical objects? Why do people tell them? How can artworks inspire new stories? "),
        //     new Theme(4, "LGBTQ+", "What can artworks tell us about the life of LGBTQ+ people? What are some of the LGBTQ+ perspectives on IMMA artworks?"),
        //     new Theme(5, "Black and Irish", "What does it mean to be Black and Irish? What are some of the Black and Irish perspectives on IMMA artworks?"),
        // );
        
        this.artworkData = new Array<Artwork>(
            new Artwork(1, "Saddle", "Dorothy Cross", "1993", "assets/img/saddle.jpg"),
            new Artwork(2, "Barrel", "Fergus Martin", "2020", "assets/img/barrel.jpg"),
            new Artwork(3, "The Drummer", "Barry Flanagan", "1996", "assets/img/drummer.jpg"),
            new Artwork(4, "Back of Snowman", "Gary Hume", "2003", "assets/img/snowman.jpg"),
            new Artwork(5, "8 Limestones cut to a specific size from rough blocks 150 x 50 x 50cm split into parts and reassembled into their original form", "Ulrich Rückriem ", "1988", "assets/img/limestones.jpg"),
            new Artwork(6, "The Painter’s Mother Resting I", "Lucian Freud", "1976", "assets/img/mother-resting.jpg"),
            new Artwork(7, "Shelter, no. 30", "Rochelle Rubinstein", "1995", "assets/img/shelter-no-30.jpg"),
            new Artwork(8, "Open Season", "Joe Lee", "1997", "assets/img/open-season.jpg")
        );

        this.stageData = new Array<Stage>(
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
            new thankyouStage(8, 8),
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
            new thankyouStage(15, 8),
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
            new thankyouStage(22, 8),
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
            new thankyouStage(29, 8),
            new welcomeStage(30, 1, "Welcome", "Welcome to the IMMA Deep Viewpoints series. What are the different meanings of family? How do families change over time and place? What is the role of family within society? These are some of the questions we hope to explore by exploring a selection of artwork from the IMMA Collection, as presented in the exhibition, The Narrow Gate of the Here-and-Now.\n So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work."),
            new contextStage(31, 2, "Directed looking", "So we can allow our eyes to wander over the piece. Nice and slowly, from top to bottom, from left to right. Nearly like we're writing an inventory, or a list of what we see. We keep it simple, just noticing colours, materials, shapes. There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this artwork."),
            new questionStage(32, 3, "What's going on in this picture?", "As we take our time to observe, what do we notice? What is our attention drawn to first? What’s going on in this painting? Can you describe what you see?", "Here are some words that might help you with your response: woman, bed, pillow, pattern, dress, grey hair, face, hands, resting"),
            new questionStage(33, 4, "Title", "The title of the work is The Painter’s Mother Resting I. Looking at the painting, how do you think the painter felt about his mother?", "Painters sometimes ask subjects to sit for hours and hours when creating a portrait. Does the fact that Freud chose to paint his elderly mother resting comfortably on a bed provide a clue about his relationship to her?"),
            new contextStage(34, 5, "Background on the artist", "Renowned for his portrayal of the human form, Lucian Freud (1922-2011) is best known for his intimate, honest, often visceral portraits. Working only from life Freud’s studio was intensely private and he mainly worked with those he was close to, often asking subjects to sit for hundreds of hours over multiple sittings to better capture the essence of their personality."),
            new questionStage(35, 6, "Meaning of Mother", "Has the role of a mother changed in the last 100 years?", "Think about your own family. Have the lives, occupations or expectations of the mothers, grandmothers, great-grandmothers in your family changed or are they the same? How?"),
            new shareWithMuseumStage(36, 7),
            new followStage(37, 8),
            new shareWithSomeoneStage(38, 9),
            new thankyouStage(39, 10),
            new welcomeStage(40, 1, "Welcome", "Welcome to the IMMA Deep Viewpoints series. What are the different meanings of family? How do families change over time and place? What is the role of family within society? These are some of the questions we hope to explore by exploring a selection of artwork from the IMMA Collection, as presented in the exhibition, The Narrow Gate of the Here-and-Now. So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work."),
            new contextStage(41, 2, "Directed looking", "So we can allow our eyes to wander over the piece. Nice and slowly, from top to bottom, from left to right. Nearly like we're writing an inventory, or a list of what we see. We keep it simple, just noticing colours, materials, shapes. There is absolutely no right or wrong way of doing this, but simply giving ourselves the time to notice and to discover this artwork."),
            new questionStage(42, 3, "What's going on in this picture?", "As we take our time to observe, what do we notice? What is our attention drawn to first? What’s going on in this painting? Can you describe what you see?", "Here are some words that might help you with your response: women, holding each other, safe, protection, shelter, border, decoration"),
            new questionStage(43, 4, "Material", "Look at the material the artist has used. It was made by printing on a piece of embroidered silk. Why do you think the artist chose this material?", "What would you associate with silk? Is silk usually associated with men or women? Why?"),
            new contextStage(44, 5, "Background on the artist", "Canadian artist Rochelle Rubinstein is committed to raising awareness about domestic violence through her work. In 1995 and 1996 Rubinstein participated on the Artists’ Residency Programme at IMMA, and made a series of works printed on fabric, which she donated to refuges and shelters around Dublin, such as Womens’ Aid. Rubinstein’s parents were refugees who set up a tailoring business in Toronto. This upbringing has influenced her work, and she employs techniques traditionally associated with women, like sewing and embroidery. In ‘Shelter, no. 30’ Rubinstein creates a striking graphic image of a young mother sheltering her child from harm. The border of the quilt is made up of symbols such as a cut-out doll’s dress, and a hand picking an olive branch."),
            new questionStage(45, 6, "Shelter", "Is it the responsibility of the family or the state to provide shelter?", "Families can provide shelter when we need it most (a roof over our heads but also emotional and psychological safety). However, the state also provides shelter in the form of social services, refuges and emergency accommodation. Do you think one is more important than the other?"),
            new shareWithMuseumStage(46, 7),
            new followStage(47, 8),
            new shareWithSomeoneStage(48, 9),
            new thankyouStage(49, 10),
            new contextStage(50, 1, "Content Warning", "Please be advised that this work contains graphic descriptions of violence against women and abuse."),
            new welcomeStage(51, 2, "Welcome", "Welcome to the IMMA Deep Viewpoints series. What are the different meanings of family? How do families change over time and place? What is the role of family within society? These are some of the questions we hope to explore by exploring a selection of artwork from the IMMA Collection, as presented in the exhibition, The Narrow Gate of the Here-and-Now. So once you're comfortable and relaxed, we can begin by taking a good, slow look at this work."),
            new contextStage(52, 3, "Directed looking", "Take your time to watch the video in full. Take in the soundtrack and notice the particular way the film is exhibited."),
            new questionStage(53, 4, "What is it about?", "What was the subject of the video? Can you describe any scenes, images or sounds that stayed with you in particular?", "Here are some words that might help you with your response: women, men, domestic violence, abuse, murder, testimony"),
            new questionStage(54, 5, "Imagine a woman two hundred years ago", "Imagine a woman, a cook at the Royal Hospital Kilmainham, watching this work two hundred years ago, in 1821. How would she respond to the work?", "Think about how much has changed or not changed for women’s rights since 1821. How would she have felt about hearing the different women’s testimonies."),
            new contextStage(55, 6, "Background on the work", "‘Open Season’ was made in 1997 and was first shown in ‘Once is Too Much…’, an exhibition of work dealing with the subject of violence against women. The exhibition was made by women from the Family Resource Centre Inchicore, working in collaboration with artists Joe Lee, Rhona Henderson, Rochelle Rubenstien and Ailbhe Murphy, and with the Education and Community department of IMMA. In this installation the viewer confronts the stark reality of events that are all too frequently reported in the media. The piece traces the patterns of violent abuse in the lives of women and juxtaposes this with the objective, measured tones of a newsreader. ‘Open Season’ is the first piece of work made by a community group to have been purchased by the Museum."),
            new questionStage(56, 7, "Community", "Open Season was made by women from the Family Resource Centre INchicore, working in collaboration with the filmmaker Joe Lee and others. What are the advantages of making artwork in collaboration with a community?", "Think about what you might gain making a video artwork with a community like this."),
            new shareWithMuseumStage(57, 8),
            new followStage(58, 9),
            new shareWithSomeoneStage(59, 10),
            new thankyouStage(60, 11)
        );
        
        this.scriptData = new Array<Script>(
            new Script(1, "Slow Looking at Saddle", new Array<Theme>(this.themeData[1], this.themeData[2], this.themeData[3], this.themeData[4]), this.artworkData[0], true, true,
            new Array<Stage>(this.stageData[0],this.stageData[1],this.stageData[2],this.stageData[3],this.stageData[4],this.stageData[5],this.stageData[6],this.stageData[7])
            ),
            new Script(2, "Slow Looking at Barrel", new Array<Theme>(this.themeData[2]), this.artworkData[1], true, true,
            new Array<Stage>(this.stageData[8],this.stageData[9],this.stageData[10],this.stageData[11],this.stageData[12],this.stageData[13],this.stageData[14])
            ),
            new Script(3, "Slow Looking at The Drummer", new Array<Theme>(this.themeData[3]), this.artworkData[2], true, true,
            new Array<Stage>(this.stageData[15],this.stageData[16],this.stageData[17],this.stageData[18],this.stageData[19],this.stageData[20],this.stageData[21])
            ),
            new Script(4, "Slow Looking at Back of Snowman", new Array<Theme>(this.themeData[4]), this.artworkData[3], true, true,
            new Array<Stage>(this.stageData[22],this.stageData[23],this.stageData[24],this.stageData[25],this.stageData[26],this.stageData[27],this.stageData[28])
            ),
            new Script(5, "Slow looking at The Painter’s Mother Resting I", new Array<Theme>(this.themeData[0]), this.artworkData[5], true, true, new Array<Stage>(this.stageData[29], this.stageData[30], this.stageData[31], this.stageData[32], this.stageData[33], this.stageData[34], this.stageData[35], this.stageData[36], this.stageData[37], this.stageData[38])),
            new Script(6, "Slow Looking at Shelter", new Array<Theme>(this.themeData[0]), this.artworkData[6], true, true, new Array<Stage>(this.stageData[39], this.stageData[40], this.stageData[41], this.stageData[42], this.stageData[43], this.stageData[44], this.stageData[45], this.stageData[46], this.stageData[47], this.stageData[48])),
            new Script(7, "Slow Looking at Open Season", new Array<Theme>(this.themeData[0]), this.artworkData[7], true, true, new Array<Stage>(this.stageData[49], this.stageData[50], this.stageData[51], this.stageData[52], this.stageData[53], this.stageData[54], this.stageData[55], this.stageData[56], this.stageData[57], this.stageData[58], this.stageData[59]))
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
            new Activity(6, this.scriptData[1], new Array<Action>(
                new questionAction(new questionStage(18, 3, "What do you see?", "As we take our time to observe, what do we notice? " +
                "What is our attention drawn to first? What is this sculpture made of? " +
                "Are there several parts to it? What materials do you see?"), 4, 
                    "As we take our time to observe, what do we notice? " +
                    "What is our attention drawn to first? What is this sculpture made of? " +
                    "Are there several parts to it? What materials do you see?",
                    "A shiny cylinder."),
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

    getStageData(): Stage[] {
        return this.stageData;
    }

}
