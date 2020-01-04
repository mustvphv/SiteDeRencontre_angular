/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Inscription_page_acceuilComponent } from './inscription_page_acceuil.component';

describe('Inscription_page_acceuilComponent', () => {
  let component: Inscription_page_acceuilComponent;
  let fixture: ComponentFixture<Inscription_page_acceuilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inscription_page_acceuilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Inscription_page_acceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
