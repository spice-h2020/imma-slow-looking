import { NgModule, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { LinkText } from "./linktext.service";


@Pipe({name: 'linkifyHtml'})
export class LinkiftHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer, private linktext: LinkText) {}
    transform(value) {
        return this.linktext.linkifyText(value);
    }
}

@NgModule({
    declarations: [LinkiftHtmlPipe],
    exports: [LinkiftHtmlPipe]
})
export class LinkiftHtmlPipeModule {}


