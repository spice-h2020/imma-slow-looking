import { Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import Autolinker, { AutolinkerConfig } from "autolinker";

@Injectable()
export class LinkText{
    
    constructor(private _sanitizer: DomSanitizer){}

    getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

    getId2 = function(url: string) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }

    AUTOLINKER_CFGS: AutolinkerConfig = {
        urls: {
          schemeMatches: true,
          wwwMatches: true,
          tldMatches: true,
        },
        email: true,
        phone: true,
        mention: "twitter",
        hashtag: "twitter",
        stripPrefix: false,
        stripTrailingSlash: false,
        newWindow: true,
        truncate: {
          length: 0,
          location: "end",
        },
        replaceFn : function(match) { 
            switch(match.getType()) {
                case 'url' : 
                    if(match.getAnchorHref().includes("youtube.com") || match.getAnchorHref().includes("youtube-nocookie.com") || match.getAnchorHref().includes("youtu.be")) {
                        const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
                        // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                        const mymatch = match.getAnchorHref().match(regExp);
                        let params = "";
                        if(mymatch[7]) {
                            params = mymatch[7].slice(1);
                            params = "?" + params;
                        }
                        if(mymatch && mymatch[6].length === 11) {
                            //max size with ratio
                            return '<div class="video-wrap"><div class="video-container"><iframe allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" src="' + 'https://www.youtube.com/embed/' + mymatch[6] + params + '"></iframe></div></div>';
                            // small screen
                            // return '<iframe width="256" height="144" src="' + 'https://www.youtube.com/embed/' + mymatch[6] + params + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                            // responsive full width
                            // return '<div class="container-iframe"><iframe class="responsive-iframe" src="' + 'https://www.youtube.com/embed/' + mymatch[6] + params + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
                        }
                        else {
                            return "";
                        }
                    }
                }
            },
        decodePercentEncoding: true,
    };

    autolinker = new Autolinker(this.AUTOLINKER_CFGS);

    linkedText = this._sanitizer.bypassSecurityTrustHtml(this.autolinker.link( "asdas bbc.co.uk  https://www.youtube.com/watch?v=UAmuQBnNty8 asdadasd p.mulholland@open.ac.uk. adas  sd" ));

    videoId = this.getId('https://www.youtube.com/watch?v=UAmuQBnNty8');

    videoURL = `https://www.youtube.com/embed/${this.videoId}`;
    // videoURL = 'https://www.youtube.com/embed/UAmuQBnNty8';
    
    safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);

    linkifyText(text: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(this.autolinker.link(text));
    }

}