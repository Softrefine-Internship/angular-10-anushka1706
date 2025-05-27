import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ImageModel } from '../image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { EditImageDialogComponent } from '../edit-image-dialog/edit-image-dialog.component';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { ConfirmDeleteBottomSheetComponent } from '../delete-confirm-bottom-sheet/delete-confirm-bottom-sheet.component';
import { TagBottomSheetComponent } from '../tag-bottom-sheet/tag-bottom-sheet.component';
import { EditImageBottomSheetComponent } from '../edit-image-bottom-sheet/edit-image-bottom-sheet.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UploadFileComponent } from '../upload-file-dialog/upload-file.component';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  images: ImageModel[] = [];
  searchTerm !: string
  searchSubscribe = new Subscription()
  sortBy !: string
  expandedTags: { [id: string]: boolean } = {};
  isMobileLayout: boolean = false;
  isLoading !: boolean
  isData !: boolean

  constructor(
    private dataService: DataService,
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private searchService: SearchService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.fetchImages();
    this.searchService.sortBy.subscribe(value => {
      this.sortBy = value
    })
    this.searchSubscribe = this.searchService.searchSubject.subscribe(term => {
      this.searchTerm = term
    })

    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.isMobileLayout = result.matches;
      });
  }
  fetchImages(): void {
    console.log('hii')
    this.dataService.fetchData().subscribe({
      next: (fetchedImages) => {
        this.images = fetchedImages;
        this.isData = true;
      },
      error: (err) => {
        this.isData = false;
      }
    });
  }
  applySearch(term: string): void {
    if (term === ' ') {
      this.fetchImages()
    } else {
      const lowerTerm = term.toLowerCase();
      const data = this.images.filter((img) =>
        img.description.toLowerCase().includes(lowerTerm) ||
        (img.tags || []).some(tag => tag.toLowerCase().includes(lowerTerm))
      );
      this.images = data
    }
  }

  toggleTags(id: string): void {
    this.expandedTags[id] = !this.expandedTags[id];
  }

  getTagsToDisplay(tags: string[], id: string): string[] {
    return this.expandedTags[id] ? tags : tags?.slice(0, 2);
  }

  getRemainingCount(tags: string[], id: string): number {
    return tags.length - this.getTagsToDisplay(tags, id).length;
  }

  openTagDialog(image: ImageModel): void {
    if (this.isMobileLayout) {
      const sheetRef = this.bottomSheet.open(TagBottomSheetComponent, {
        data: { tags: image?.tags || [] }
      });

      sheetRef.afterDismissed().subscribe((result: string[] | undefined | []) => {
        if (result) {
          const updatedImage: ImageModel = { ...image, tags: result };
          this.dataService.updateImage(image.id!, updatedImage).subscribe(() => {
            this.snackBar.open('Tags updated', 'Close', { duration: 3000 });
            this.fetchImages();
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(TagDialogComponent, {
        width: '400px',
        data: { tags: image.tags },
      });

      dialogRef.afterClosed().subscribe((result: string[] | undefined) => {
        if (result) {
          const updatedImage: ImageModel = { ...image, tags: result };
          this.dataService.updateImage(image.id!, updatedImage).subscribe(() => {
            this.snackBar.open('Tags updated', 'Close', { duration: 3000 });
            this.fetchImages();
          });
        }
      });
    }
  }

  deleteImage(imageId: number, description: string): void {
    const confirmDelete = (confirmed: boolean) => {
      if (confirmed) {
        this.dataService.deleteImage(imageId.toString()).subscribe({
          next: () => {
            this.snackBar.open('Image deleted', 'Close', { duration: 3000 });
            this.fetchImages();
            this.images = this.images.filter(image => image.id !== imageId.toString());
          },
          error: (err) => {
            this.snackBar.open('Failed to delete', 'Close', { duration: 3000 });
            this.fetchImages();
            console.error('Failed to delete image from Firebase:', err);
          }
        });
      }
    };

    if (this.isMobileLayout) {
      const sheetRef = this.bottomSheet.open(ConfirmDeleteBottomSheetComponent, {
        data: { description }
      });

      sheetRef.afterDismissed().subscribe(confirmDelete);
    } else {
      const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
        disableClose: true,
        width: 'auto',
        height: 'auto',
        data: { description }
      });

      dialogRef.afterClosed().subscribe(confirmDelete);
    }
  }

  onEditImage(image: ImageModel): void {
    if (this.isMobileLayout) {
      const sheetRef = this.bottomSheet.open(EditImageBottomSheetComponent, {
        data: { image }
      });

      sheetRef.afterDismissed().subscribe((updatedImage: any) => {
        this.dataService.updateImage(image.id!, updatedImage).subscribe(() => {
          this.snackBar.open('Image updated successfully', 'Close', { duration: 3000 });
          this.fetchImages();
        });
      });
    } else {
      const dialogRef = this.dialog.open(EditImageDialogComponent, {
        disableClose: true,
        width: '500px',
        data: { image },
      });

      dialogRef.afterClosed().subscribe((updatedImage: ImageModel | undefined) => {
        if (updatedImage) {
          this.dataService.updateImage(image.id!, updatedImage).subscribe(() => {
            this.snackBar.open('Image updated successfully', 'Close', { duration: 3000 });
            this.fetchImages();
          });
        }
      });
    }
  }
  viewImage(image: any): void {
    this.router.navigate(['view', image.id], {
      queryParams: {
        id: image.id
      }
    });
  }
  shouldShowToggleButton(tags: string[]): boolean {
    return tags?.length > 2;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      disableClose: true,
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
        this.fetchImages();
    });
  }
}