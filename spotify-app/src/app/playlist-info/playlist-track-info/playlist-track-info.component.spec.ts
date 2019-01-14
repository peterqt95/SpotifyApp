import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistTrackInfoComponent } from './playlist-track-info.component';

describe('PlaylistTrackInfoComponent', () => {
  let component: PlaylistTrackInfoComponent;
  let fixture: ComponentFixture<PlaylistTrackInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistTrackInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistTrackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
