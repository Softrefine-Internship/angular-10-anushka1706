import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagBottomSheetComponent } from './tag-bottom-sheet.component';

describe('TagBottomSheetComponent', () => {
  let component: TagBottomSheetComponent;
  let fixture: ComponentFixture<TagBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagBottomSheetComponent]
    });
    fixture = TestBed.createComponent(TagBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
