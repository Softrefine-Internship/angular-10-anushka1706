import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(images: any[], sortBy: string): any[] {
    if (!images || !sortBy) return images;

    switch (sortBy) {
      case 'newest':
        return images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return images.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'updated':
        return images.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'description':
        return images.sort((a, b) => a.description.localeCompare(b.description));
      default:
        return images;
    }
  }
}
