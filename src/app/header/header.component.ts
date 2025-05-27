import { Component } from '@angular/core';
import { UploadFileComponent } from '../upload-file-dialog/upload-file.component';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchTerm: string = '';
  sortBy: string = 'newest'

  constructor(private searchService: SearchService, private router: Router, private dialog: MatDialog) { }

  onSearchChange() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
  onSortChange(value: string) {
    this.searchService.sortBy.next(value)
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
  openDialog(): void {
   this.dialog.open(UploadFileComponent, {
      disableClose: true,
      width: '800px'
    });
  }
}

