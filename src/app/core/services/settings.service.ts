import * as _ from "lodash";

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SettingsService {

  private settings: any;

  constructor() {
    this.settings = environment || {};
  }

  all() {
    return this.settings;
  }

  get(path: string, defaultValue?: any) {
    return _.get(this.all(), path, defaultValue);
  }

  getApiPath(): string {
    return `${this.get('services.student.path', '')}`;
  }

}
