import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the ReturnqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-returnqr',
  templateUrl: 'returnqr.html',
})
export class ReturnqrPage {
  imgUrl : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private userservice: UserserviceProvider) {
    this.imgUrl = "https://chart.googleapis.com/chart?cht=qr&chl="+navParams.data.item.id+"&chs=200x200&choe=UTF-8&chld=L%7C2%27%20alt=%27qr%20code";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReturnqrPage');
  }

}
