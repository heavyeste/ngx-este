import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxEsteComponent } from './ngx-este.component';

describe('NgxEsteComponent', () => {
  let component: NgxEsteComponent;
  let fixture: ComponentFixture<NgxEsteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxEsteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEsteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
