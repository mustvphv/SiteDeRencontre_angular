import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarProfilUtilisateurComponent } from './top-bar-profil-utilisateur.component';

describe('TopBarProfilUtilisateurComponent', () => {
  let component: TopBarProfilUtilisateurComponent;
  let fixture: ComponentFixture<TopBarProfilUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarProfilUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarProfilUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
