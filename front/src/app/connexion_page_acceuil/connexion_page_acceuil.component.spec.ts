/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Connexion_page_acceuilComponent } from './connexion_page_acceuil.component';

describe('Connexion_page_acceuilComponent', () => {
  let component: Connexion_page_acceuilComponent;
  let fixture: ComponentFixture<Connexion_page_acceuilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Connexion_page_acceuilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Connexion_page_acceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
