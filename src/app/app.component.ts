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

  onEdit(student: any) {
    this.appService
      .updateStudent(student)
      .subscribe((student: any) => {
        console.log(student);
      }, (error: any) => {
        // TODO: Handle error
        console.warn(error);
      });
  }

  onDelete(student: any) {
    this.appService
      .deleteStudent(student._id)
      .subscribe((del: any) => {
        if (del) {
          let index: number = this.students.indexOf(student);

          if (index >= 0) {
            this.students.splice(index, 1);
          }
        } else {
          console.warn("Não foi possível deletar o aluno");
        }
      }, (error: any) => {
        // TODO: Handle error
        console.warn(error);git 
      });
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
