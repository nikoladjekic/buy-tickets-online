import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private _eventService: EventService, private _router: Router) { }

  events = [];

  ngOnInit() {
    this._eventService.getEvents().subscribe(
      res => this.events = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
