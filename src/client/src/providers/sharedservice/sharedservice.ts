import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../app/model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the SharedserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharedserviceProvider Provider');
  }

  getItems(): Promise<Item[]>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item')
    .map(res => <Item[]>res)
    .toPromise<Item[]>();
  }
  
  addItem(model: Item): Promise<any> {
    var options = { "headers": { "Content-Type": "application/json" } };
    console.log(model);
    return this.http.post('https://jellyfish.azurewebsites.net/api/item', model, options)
    .toPromise();
  }
}
