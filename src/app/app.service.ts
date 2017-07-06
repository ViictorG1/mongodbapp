import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RestClientService } from './core/services/rest-client.service';
import { SettingsService } from './core/services/settings.service';

@Injectable()
export class AppService extends RestClientService {

  private apiPath: string;

  constructor(
    private http: Http,
    private settings: SettingsService
  ) {
    super();
    this.apiPath = this.settings.getApiPath();
  }

  getStudents(): Observable<any[]> {
    return this.http
      .get(this.collectionPath(), this.buildRequestOptions())
      .map((response: Response) => {
        let students = this.extract<any[]>(response);
        return students = students.map((student: any) => {
          return student = this.unmarshalStudent(student);
        });
      })
      .catch(this.handleError);
  }

  getStudent(id: string): Observable<any> {
    return this.http
      .get(this.elementPath(id), this.buildRequestOptions())
      .map((response: Response) => {
        return this.extract<any>(response);
      })
      .catch(this.handleError);
  }

  createStudent(data: any): Observable<any> {
    const body: any = JSON.stringify(data);

    return this.http
      .post(this.collectionPath(), body, this.buildRequestOptions())
      .map((response: Response) => {
        return this.extract<any>(response);
      })
      .catch(this.handleError);
  }

  updateStudent(data: any): Observable<any> {
    const body: any = JSON.stringify(this.marshalStudent(data));

    return this.http
      .put(this.elementPath(data.id), body, this.buildRequestOptions())
      .map((response: Response) => {
        let student = this.extract<any>(response);
        return this.unmarshalStudent(student);
      })
      .catch(this.handleError);
  }

  deleteStudent(id: string): Observable<boolean> {
    return this.http
      .delete(this.elementPath(id), this.buildRequestOptions())
      .map((response: Response) => {
        return true;
      })
      .catch(this.handleError);
  }

  private marshalStudent(student: any): any {
    return {
      _id: student.id,
      name: student.name,
      average: student.average,
      nota1: student.nota1,
      nota2: student.nota2,
      nota3: student.nota3
    };
  }

  private unmarshalStudent(student: any): any {
    return {
      id: student._id,
      name: student.name,
      nota1: student.nota1,
      nota2: student.nota2,
      nota3: student.nota3,
      average: this.calcAverage(student.nota1, student.nota2, student.nota3)
    }
  }

  private calcAverage(nota1, nota2, nota3) {
    let calc = (nota1 + nota2 + nota3) / 3;
    return calc.toFixed(1);
  }

  private collectionPath(): string {
    return `${this.apiPath}/students`;
  }

  private elementPath(id: string): string {
    return `${this.collectionPath()}/${id}`;
  }

}
