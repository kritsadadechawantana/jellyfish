import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BorrowqrPage } from '../borrowqr/borrowqr';
import { Item } from '../../app/model';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { PairconfirmPage } from '../pairconfirm/pairconfirm';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  items: Item[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private barcodeScanner: BarcodeScanner,private alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item'); 

  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(BorrowqrPage, {
      item: item
    });
  }
  scan(){this.barcodeScanner.scan().then(barcodeData => {
 console.log('Barcode data', barcodeData);
 if(barcodeData.text != undefined)this.navCtrl.push(PairconfirmPage,barcodeData.text);
}).catch(err => {
    console.log('Error', err);
});
};

ionViewWillEnter(){
  this.sharedService.getAvailableItems().then(item => 
    {    
        this.items = item
    });
}

}
