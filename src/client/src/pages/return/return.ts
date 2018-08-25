import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item, BorrowInfo } from '../../app/model';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { ReturnqrPage } from '../returnqr/returnqr';
import { PairreturnPage } from '../pairreturn/pairreturn';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the ReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-return',
  templateUrl: 'return.html',
})
export class ReturnPage {
  selectedItem: any;
  items: BorrowInfo[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController, private userservice: UserserviceProvider) {
    this.selectedItem = navParams.get('item'); 

  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ReturnqrPage, {
      item: item
    });
  }
  scan(){this.barcodeScanner.scan().then(barcodeData => {
 if(barcodeData.text != undefined)this.navCtrl.push(PairreturnPage,barcodeData.text);
}).catch(err => {
    console.log('Error', err);
});
};

ionViewWillEnter(){
  this.sharedService.getMyBorrow(this.userservice.Username).then(item => 
    {    
        this.items = item
    });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnPage');
  }

}
