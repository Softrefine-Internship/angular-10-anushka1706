import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { DataService } from '../data.service';
import { ImageModel } from '../image.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

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
    private router: Router, // Inject Router
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fileForm = this.fb.group({
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[], Validators.required],
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value?.trim();

    if (value && !this.fileForm.get('tags')?.value.includes(value)) { // Prevent duplicates
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
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.file = event.dataTransfer.files[0];
      this.fileForm.patchValue({ imageUrl: this.file.name });
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.fileForm.patchValue({ imageUrl: this.file.name });
    }
  }

  onSubmit() {
    if (this.fileForm.invalid) {
      this.snackBar.open('Please fill all required fields, including at least one tag', 'Close', {
        duration: 3000,
      });
      console.log('Form is invalid:', this.fileForm.errors);
      console.log('Tags control errors:', this.fileForm.get('tags')?.errors);
      return;
    }

    const formValue = this.fileForm.value;
    const currentTime = new Date().toISOString();

    const tags = Array.isArray(formValue.tags) ? formValue.tags : [];
    if (tags.length === 0) {
      this.snackBar.open('Please add at least one tag', 'Close', { duration: 3000 });
      return;
    }

    const data: ImageModel = {
      id : '0',
      imageUrl: formValue.imageUrl,
      description: formValue.description,
      tags: tags,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    console.log('Submitting data:', data);
    this.dataService.saveData(data).subscribe({
      next: (response) => {
        console.log(response.name)
        this.snackBar.open('Image uploaded successfully!', 'Close', { duration: 3000 });
        this.fileForm.reset();
        this.file = null;
        this.router.navigate(['']); 
      },
      error: (error) => {
        this.snackBar.open('Error uploading image', 'Close', { duration: 3000 });
        console.error('Error saving to Firebase:', error);
      },
    });
  }
}