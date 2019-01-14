import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-playlist-follower-selection',
  templateUrl: './playlist-follower-selection.component.html',
  styleUrls: ['./playlist-follower-selection.component.css']
})
export class PlaylistFollowerSelectionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlaylistFollowerSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
