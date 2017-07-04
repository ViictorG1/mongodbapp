import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  students: any[] = [];

  constructor(
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    this.loadStudents();
  }

  private loadStudents() {
    this.appService
      .getStudents()
      .subscribe((students: any[]) => {
        console.log(students);
        this.students = students;
      }, (error: any) => {
        // TODO: Handle error
        console.warn(error);
      });
  }
}
