import { Component, OnInit } from '@angular/core';
import {FlatService} from '../shared/flat.service';

@Component({
  selector: 'app-flats-list',
  templateUrl: './flats-list.component.html',
  styleUrls: ['./flats-list.component.css']
})
export class FlatsListComponent implements OnInit {

  constructor(private flatService : FlatService) { }

  ngOnInit() {
  }

}
