import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BorrowInfo } from '../../app/model';
import { HomePage } from '../home/home';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the PairreturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pairreturn',
  templateUrl: 'pairreturn.html',
})
export class PairreturnPage {
  item:BorrowInfo = new BorrowInfo("","","","","","");
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private alertCtrl: AlertController, private userservice: UserserviceProvider) {
    sharedService.getBorrowInfo(navParams.data).then(data =>{ 
      console.log(data);
      this.item = data
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PairreturnPage');
  }
  confirm(){
    this.sharedService.returnItem(this.item.id)
    .then(data => { this.navCtrl.popToRoot()})
    let alert = this.alertCtrl.create({
      title: 'แจ้งเตือน',
      subTitle: 'คุณคืนสำเร็จ !',
      buttons: ['Dismiss']
    });
    alert.present();    
  }

}
