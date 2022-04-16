import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoformNgModelComponent } from './autoformmodel.component';

describe('AutoformComponent', () => {
  let component: AutoformNgModelComponent;
  let fixture: ComponentFixture<AutoformNgModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoformNgModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoformNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
