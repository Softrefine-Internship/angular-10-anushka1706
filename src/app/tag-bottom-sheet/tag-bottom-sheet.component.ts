import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-tag-bottom-sheet',
  templateUrl: './tag-bottom-sheet.component.html',
  styleUrls: ['./tag-bottom-sheet.component.scss']
})
export class TagBottomSheetComponent {
  tags: string[] = [];
  newTag: string = '';

  constructor(
    private bottomSheetRef: MatBottomSheetRef<TagBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { tags: string[] }
  ) {
    this.tags = [...data.tags];
  }

  addTag(): void {
    if (this.newTag.trim()) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  save(): void {
    this.bottomSheetRef.dismiss(this.tags);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
