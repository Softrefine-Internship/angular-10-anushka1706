import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageModel } from '../image.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-image-dialog',
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.scss'],
})
export class EditImageDialogComponent {
  editForm: FormGroup;
  file: File | null = null;
  isDragging = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chipList') chipList!: MatChipGrid;

  constructor(
    public dialogRef: MatDialogRef<EditImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: any },
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      imageUrl: [data.image['imageUrl'], Validators.required],
      description: [data.image['description'], Validators.required],
      tags: [data.image['tags'] || [], Validators.required],
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.editForm.get('tags')?.value.includes(value)) {
      const tagsControl = this.editForm.get('tags');
      const currentTags = tagsControl?.value || [];
      tagsControl?.setValue([...currentTags, value]);
      tagsControl?.markAsTouched();
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const tagsControl = this.editForm.get('tags');
    const currentTags = tagsControl?.value || [];
    const updatedTags = currentTags.filter((t: string) => t !== tag);
    tagsControl?.setValue(updatedTags);
    tagsControl?.markAsTouched();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.file = event.dataTransfer.files[0];
      this.editForm.patchValue({ imageUrl: this.file.name });
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.editForm.patchValue({ imageUrl: this.file.name });
    }
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }
    const updatedImage: ImageModel = {
      ...this.data.image,
      imageUrl: this.editForm.value.imageUrl,
      description: this.editForm.value.description,
      tags: this.editForm.value.tags,
    };
    this.dialogRef.close(updatedImage);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}