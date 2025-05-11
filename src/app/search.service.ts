import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
   searchSubject = new BehaviorSubject<string>('');

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
