import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../app/model';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { ManagePage } from '../manage/manage';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  slots = ['1A', '1B', '1C'];
  item : Item = new Item(0,"Name","1A",false,new Date());

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider) {
  }
  
  onSubmit() {
    this.sharedService.addItem(this.item).then(() => this.navCtrl.push(ManagePage));
  }

}
