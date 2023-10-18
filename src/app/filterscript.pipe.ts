// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Artwork } from './artwork.model';
import { Script } from './script.model';

@Pipe({ name: 'appFilterScript' })
export class FilterScriptPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchScriptText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Script[], searchScriptText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchScriptText) {
      return items;
    }
    searchScriptText = searchScriptText.toLowerCase();

    return items.filter(it => {
      return (it.name+it.description).toLowerCase().includes(searchScriptText);
    });
  }
}