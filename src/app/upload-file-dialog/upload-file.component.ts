import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ImageModel } from '../image.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  file: File | null = null;
  isDragging = false;
  fileForm!: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('chipList') chipList!: MatChipGrid;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UploadFileComponent>
  ) { }

  ngOnInit(): void {
    console.log('DialogRef:', this.dialogRef);
    this.fileForm = this.fb.group({
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[]],
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value?.trim();

    if (value && !this.fileForm.get('tags')?.value.includes(value)) {
      const tagsControl = this.fileForm.get('tags');
      const currentTags = tagsControl?.value || [];
      tagsControl?.setValue([...currentTags, value]);
      tagsControl?.markAsTouched();
    }

    if (input) input.value = '';
  }

  removeTag(tag: string): void {
    const tagsControl = this.fileForm.get('tags');
    const currentTags = tagsControl?.value || [];
    const updatedTags = currentTags.filter((t: string) => t !== tag);
    tagsControl?.setValue(updatedTags);
    tagsControl?.markAsTouched();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent) {
    let previewImage !: string
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.file = event.dataTransfer.files[0];
      this.processImage(this.file)
    }
  }
  processImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const previewImage = reader.result as string;
      this.fileForm.patchValue({ imageUrl: previewImage });
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event: Event) {
    let previewImage !: string
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.processImage(this.file)
    }
  }

  onSubmit() {
    if (this.fileForm.invalid) {
      this.snackBar.open('Please fill all required fields, including at least one tag', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formValue = this.fileForm.value;
    const currentTime = new Date().toISOString();
    const tags = Array.isArray(formValue.tags) ? formValue.tags : [];
    const data: ImageModel = {
      id: '0',
      imageUrl: formValue.imageUrl,
      description: formValue.description,
      tags: tags,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    this.dataService.saveData(data).subscribe({
      next: (response) => {
        this.snackBar.open('Image uploaded successfully!', 'Close', { duration: 3000 });
        this.fileForm.reset();
        this.file = null;
        this.dialogRef.close();
      },
      error: (error) => {
        this.snackBar.open('Error uploading image', 'Close', { duration: 3000 });
        console.error('Error saving to Firebase:', error);
      },
    });
  }
}
