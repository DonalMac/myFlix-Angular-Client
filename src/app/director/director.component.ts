/**
 * The Director component renders information about a Director and is implemented when
 * clicking the "Director" button on a movie card.
 *
 * @module DirectorComponent
 */
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {

  /**
  * @param data An object containing Director data.
  * Must have Name, Bio, Birth, and Death, properties (all strings)
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit(): void { }
}
