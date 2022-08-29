import { NgModule, Pipe, PipeTransform } from "@angular/core";
import { Linkifier } from "./linkifier";


@Pipe({
  name: "linkify",
})
export class LinkifyPipe implements PipeTransform {
  private linkifer: Linkifier;

  constructor() {
    this.linkifer = new Linkifier();
  }

  transform(value: string): string {
    let linkified = this.linkifer.link(value);
    return linkified;
  }
}

@NgModule({
  declarations: [LinkifyPipe],
  exports: [LinkifyPipe],
})
export class LinkifyPipeModule {}