import { Component, OnInit } from '@angular/core';

//Get the route
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Get the data from the route creator
//import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-data-entry-view',
  templateUrl: './data-entry-view.component.html',
  styleUrls: ['./data-entry-view.component.css']
})
export class DataEntryViewComponent implements OnInit {

  //Inject the ActivatedRoute, Service, and Location services 
  //into the constructor, saving their values in private fields:
  constructor(
    private route: ActivatedRoute,
    //private heroService: HeroService,

    //The location is an Angular service for interacting with the browser.
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  //To obtain the data, this component needs to
  //-Get the route that created it
  //-Extract the id from the route
  //-Acquire the data with that id from the server via the Service

}
