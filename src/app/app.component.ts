import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'measurement-chart-project';
  
  constructor(private http:HttpClient) {}

  ngOnInit() {
   
  }

}
