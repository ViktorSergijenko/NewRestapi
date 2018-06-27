import { Component, OnInit } from '@angular/core';
import { FlatService } from './shared/flat.service';
@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css'],
  providers: [FlatService]
})
export class FlatsComponent implements OnInit {

  constructor(private flatService: FlatService) { }

  ngOnInit() {
  }

}
