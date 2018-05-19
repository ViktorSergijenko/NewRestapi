import { Component, OnInit } from '@angular/core';
import {ResidentService} from './shared/resident.service';
@Component({
  providers:[ResidentService],
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {

  constructor(private residentService : ResidentService) { }

  ngOnInit() {
  }

}
