import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageBottomSheetComponent } from './edit-image-bottom-sheet.component';

describe('EditImageBottomSheetComponent', () => {
  let component: EditImageBottomSheetComponent;
  let fixture: ComponentFixture<EditImageBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditImageBottomSheetComponent]
    });
    fixture = TestBed.createComponent(EditImageBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
