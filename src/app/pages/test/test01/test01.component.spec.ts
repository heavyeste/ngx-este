/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestTest01Component } from './test01.component';

describe('HomeComponent', () => {
  let component: TestTest01Component;
  let fixture: ComponentFixture<TestTest01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTest01Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTest01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
