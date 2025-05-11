import { Pipe, PipeTransform } from '@angular/core';
import { ImageModel } from './image.model';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(images: ImageModel[], searchTerm: string): ImageModel[] {
    if (!images || !searchTerm) {
      return images; 
    }

    const lowerTerm = searchTerm.toLowerCase();
    return images.filter(img =>
      img.description.toLowerCase().includes(lowerTerm) ||
      (img.tags || []).some(tag => tag.toLowerCase().includes(lowerTerm))
    );
  }
}
