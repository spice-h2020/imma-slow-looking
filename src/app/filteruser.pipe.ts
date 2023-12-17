// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({ name: 'appFilterUser' })
export class FilterUserPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchScriptText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: User[], searchUserText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchUserText) {
      return items;
    }
    searchUserText = searchUserText.toLowerCase();

    return items.filter(it => {
      return (it.username+it.displayname).toLowerCase().includes(searchUserText);
    });
  }
}