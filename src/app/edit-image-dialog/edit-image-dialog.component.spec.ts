import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageDialogComponent } from './edit-image-dialog.component';

describe('EditImageDialogComponent', () => {
  let component: EditImageDialogComponent;
  let fixture: ComponentFixture<EditImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditImageDialogComponent]
    });
    fixture = TestBed.createComponent(EditImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
