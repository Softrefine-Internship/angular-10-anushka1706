import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmBottomSheetComponent } from './delete-confirm-bottom-sheet.component';

describe('DeleteConfirmBottomSheetComponent', () => {
  let component: DeleteConfirmBottomSheetComponent;
  let fixture: ComponentFixture<DeleteConfirmBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmBottomSheetComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
