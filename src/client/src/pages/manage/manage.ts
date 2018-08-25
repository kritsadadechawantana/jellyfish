import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { AddPage } from '../add/add';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { Item } from '../../app/model';

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {
  selectedItem: any;
  items: Item[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider) {
        this.selectedItem = navParams.get('item');      
        this.sharedService.getItems().then(item => 
        {          
            this.items = item
        });
  }
  itemAdd(){
    this.navCtrl.push(AddPage);
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  ionViewWillEnter(){
    this.sharedService.getItems().then(item => 
      {        
          this.items = item
      });
  }
}
