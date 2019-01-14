import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistFollowerSelectionComponent } from './playlist-follower-selection.component';

describe('PlaylistFollowerSelectionComponent', () => {
  let component: PlaylistFollowerSelectionComponent;
  let fixture: ComponentFixture<PlaylistFollowerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistFollowerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistFollowerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
