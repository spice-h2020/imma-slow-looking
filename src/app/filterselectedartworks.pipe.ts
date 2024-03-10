// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Artwork } from './artwork.model';

@Pipe({ name: 'appFilterArtworks' })
export class FilterSelectedArtworksPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the includedArtworks provided
   *
   * @param items list of elements to search in
   * @param includedArtworks search list
   * @returns list of elements filtered by includedArtworks or []
   */
  transform(items: Artwork[], includedArtworks: string[], showCurrentSelection:boolean): any[] {

    if (!items) {
      return [];
    }
    if(!showCurrentSelection) {
        return items;
    }
    if (!includedArtworks) {
      return [];
    }

    return items.filter(it => 
        includedArtworks.includes(it._id));
  }
}