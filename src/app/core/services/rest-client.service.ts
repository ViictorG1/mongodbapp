import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class RestClientService {

  extract<T>(response: Response): T {
    return <T>response.json();
  }

  buildRequestOptions(queryParams: any = {}): RequestOptions {
    const headers: Headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    });
    const params: URLSearchParams = new URLSearchParams();

    return new RequestOptions({ headers: headers, search: params });
  }

  handleError(error: any): ErrorObservable {
    const message = error.message || 'Server error';
    return Observable.throw(message);
  }

}
