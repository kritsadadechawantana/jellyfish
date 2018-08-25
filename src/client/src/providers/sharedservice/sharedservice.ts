import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, BorrowInfo } from '../../app/model';
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
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/get')
    .map(res => <Item[]>res)
    .toPromise<Item[]>();
  }
  
  getAvailableItems(): Promise<Item[]>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/availableitem')
    .map(res => <Item[]>res)
    .toPromise<Item[]>();
  }
  
  addItem(model: Item): Promise<any> {
    var options = { "headers": { "Content-Type": "application/json" } };
    console.log(model);
    return this.http.post('https://jellyfish.azurewebsites.net/api/item/additem', model, options)
    .toPromise();
  }

  
  borrowItem(id:string,username:string): Promise<any>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/borrowitem/'+id+'/'+username)
    .toPromise<any>();
  }

  getBorrowInfo(id:string): Promise<BorrowInfo>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/getborrow/'+id)
    .map(res => <BorrowInfo>res)
    .toPromise<BorrowInfo>();
  }

  confirmBorrow(id:string,username:string): Promise<any>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/approveborrow/'+id+'/'+username)
    .toPromise<any>();
  }

  returnItem(id:string): Promise<any>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/returnitem/'+id)
    .toPromise<any>();
  }

  getMyBorrow(username:string): Promise<BorrowInfo[]>{
    return this.http.get('http://jellyfish.azurewebsites.net/api/item/getmyborrow/'+username)
    .map(res => <BorrowInfo[]>res)
    .toPromise<BorrowInfo[]>();
  }
}
