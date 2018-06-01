import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './entities/item';

@Pipe({
  name: 'itemsFilter'
})
export class ItemsFilterPipe implements PipeTransform {

  transform(items: Item[], args: string): any {
    if (args && items.length > 0) {
      let itemsFound = items.filter(
        item => item.name && item.name.toLowerCase().includes(args.toLowerCase()) ||
        item.description && item.description.toLowerCase().includes(args.toLowerCase())
      );
      if (itemsFound && itemsFound.length > 0 ){
        return itemsFound;
      }
      return [-1]; // to display error message (none found) in view.
    }
    return items;
  }


}
