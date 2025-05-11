import { Pipe, PipeTransform } from '@angular/core';
import { ImageModel } from './image.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(images: ImageModel[], sortBy: string): ImageModel[] {
    if (!images || !sortBy) {
      return images;
    }

    return images.sort((a, b) => {
      if (sortBy === 'description') {
        return a.description.localeCompare(b.description);
      } else if (sortBy === 'tags') {
        const tagsA = a.tags ? a.tags.join(', ').toLowerCase() : '';
        const tagsB = b.tags ? b.tags.join(', ').toLowerCase() : '';
        return tagsA.localeCompare(tagsB);
      }
      return 0;
    });
  }
}
