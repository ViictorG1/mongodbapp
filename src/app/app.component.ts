import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  students: any[] = [];
  editing: boolean = false;
  data: any = {};
  editingStudent: any;

  private el: HTMLElement;

  constructor(
    private appService: AppService,
    el: ElementRef
  ) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.loadStudents();
  }

  onEdit(student: any) {
    this.editing = true;
    student.showInfo = true;
    this.data = student;
    this.editingStudent = this.data;
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.appService
        .updateStudent(this.data)
        .subscribe((student: any) => {
          let index: number = this.students.indexOf(this.editingStudent);

          if (index >= 0) {
            this.students.splice(index, 1, student);
            this.onCancel();            
          }
        }, (error: any) => {
          // TODO: Handle error
          console.warn(error);
        });
    }
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
        console.warn(error);
      });
  }

  onCancel() {
    this.editing = false;
  }

  private loadStudents() {
    this.appService
      .getStudents()
      .subscribe((students: any[]) => {
        this.students = students;
        console.log(students);        
      }, (error: any) => {
        // TODO: Handle error
        console.warn(error);
      });
  }
}
