import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicFormsComponent } from './ngx-dynamic-forms.component';

describe('NgxDynamicFormsComponent', () => {
  let component: NgxDynamicFormsComponent;
  let fixture: ComponentFixture<NgxDynamicFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDynamicFormsComponent]
    });
    fixture = TestBed.createComponent(NgxDynamicFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
