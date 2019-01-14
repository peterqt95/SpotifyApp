import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCompareComponent } from './playlist-compare.component';

describe('PlaylistCompareComponent', () => {
  let component: PlaylistCompareComponent;
  let fixture: ComponentFixture<PlaylistCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
