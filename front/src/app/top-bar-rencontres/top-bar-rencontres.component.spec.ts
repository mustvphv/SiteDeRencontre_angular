import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarRencontresComponent } from './top-bar-rencontres.component';

describe('TopBarRencontresComponent', () => {
  let component: TopBarRencontresComponent;
  let fixture: ComponentFixture<TopBarRencontresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarRencontresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarRencontresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
