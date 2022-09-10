import { Autolinker, AutolinkerConfig, HashtagMatch } from "autolinker";
import { DomSanitizer } from "@angular/platform-browser";

const replaceAutolinkerMatch = (url: string) => {return '<iframe width="560" height="315" src="https://www.youtube.com/embed/UAmuQBnNty8" frameborder="0" allowfullscreen></iframe>'};

const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

const AUTOLINKER_CFGS: AutolinkerConfig = {
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
};

export class Linkifier {
  private autolinker: Autolinker;
  private _sanitizer: DomSanitizer;

  constructor() {
    this.autolinker = new Autolinker(AUTOLINKER_CFGS);
  }

  public link(textOrHtml: string): string {
    return this.autolinker.link(textOrHtml);
  }
}


