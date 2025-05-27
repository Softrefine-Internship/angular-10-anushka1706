import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchSubject = new BehaviorSubject<string>('');
  sortBy: BehaviorSubject<string> = new BehaviorSubject<string>('newest');

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
