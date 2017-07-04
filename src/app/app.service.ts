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
        const students = this.extract<any[]>(response);
        console.log(students);
        return students;
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
        return this.extract<any>(response);
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
      status: [ student.status ],
      average: student.average
    };
  }

  private collectionPath(): string {
    return `${this.apiPath}/students`;
  }

  private elementPath(id: string): string {
    return `${this.collectionPath()}/${id}`;
  }

}
