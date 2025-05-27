import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImageModel } from '../image.model';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-image-bottom-sheet',
  templateUrl: './edit-image-bottom-sheet.component.html',
})
export class EditImageBottomSheetComponent {
  editForm: FormGroup;
  isDragging = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditImageBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { image: any },
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      imageUrl: [data.image.imageUrl || '', Validators.required],
      description: [data.image.description || '', Validators.required],
      tags: [data.image.tags || [], Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.editForm.patchValue({ imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const tags = this.editForm.get('tags')?.value || [];
      this.editForm.patchValue({ tags: [...tags, value] });
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const tags = this.editForm.get('tags')?.value || [];
    this.editForm.patchValue({ tags: tags.filter((t: string) => t !== tag) });
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedImage: ImageModel = {
        ...this.data.image,
        ...this.editForm.value,
      };
      this.bottomSheetRef.dismiss(updatedImage);
    }
  }
}
