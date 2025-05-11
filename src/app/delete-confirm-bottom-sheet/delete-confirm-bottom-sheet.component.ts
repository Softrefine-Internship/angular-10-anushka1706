import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-confirm-delete-bottom-sheet',
  templateUrl: './delete-confirm-bottom-sheet.component.html',
  styleUrls: ['./delete-confirm-bottom-sheet.component.scss']
})
export class ConfirmDeleteBottomSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ConfirmDeleteBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { title: string }
  ) {}

  confirm(): void {
    this.bottomSheetRef.dismiss(true);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss(false);
  }
}
