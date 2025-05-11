import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { GalleryComponent } from './gallery/gallery.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ImageItemComponent } from './image-item/image-item.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SuccessComponent } from './shared/success/success.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { EditImageDialogComponent } from './edit-image-dialog/edit-image-dialog.component';
import { SearchPipe } from './search.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { SortPipe } from './sorting.pipe';
import { MatSelectModule } from '@angular/material/select';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TagBottomSheetComponent } from './tag-bottom-sheet/tag-bottom-sheet.component';
import { EditImageBottomSheetComponent } from './edit-image-bottom-sheet/edit-image-bottom-sheet.component';
import { ConfirmDeleteBottomSheetComponent } from './delete-confirm-bottom-sheet/delete-confirm-bottom-sheet.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    ViewComponent,
    ImageItemComponent,
    SuccessComponent,
    UploadFileComponent,
    TagDialogComponent,
    EditImageDialogComponent,
    SearchPipe,
    SortPipe,
    DeleteConfirmDialogComponent,
    TagBottomSheetComponent,
    EditImageBottomSheetComponent,
    ConfirmDeleteBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatToolbarModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatBottomSheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
