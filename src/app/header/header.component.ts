import { Component, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService, private router: Router) { }

  onSearchChange() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchService.updateSearchTerm('');
  }
  showSearch(): boolean {
    return !this.router.url.includes('/upload');
  }
  showHeader() {
    return !this.router.url.includes('/view');
  }
}
