import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the BorrowqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borrowqr',
  templateUrl: 'borrowqr.html',
})
export class BorrowqrPage {
  imgUrl : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private userservice: UserserviceProvider) {
    this.sharedService.borrowItem(navParams.data.item.id,userservice.Username).then(data => this.imgUrl = "https://chart.googleapis.com/chart?cht=qr&chl="+data.id+"&chs=200x200&choe=UTF-8&chld=L%7C2%27%20alt=%27qr%20code");
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowqrPage');
  }

}
