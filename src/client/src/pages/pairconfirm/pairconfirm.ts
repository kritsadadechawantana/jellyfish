import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BorrowInfo } from '../../app/model';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { HomePage } from '../home/home';

/**
 * Generated class for the PairconfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pairconfirm',
  templateUrl: 'pairconfirm.html',
})
export class PairconfirmPage {
  item:BorrowInfo = new BorrowInfo("","","","","","");
  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService: SharedserviceProvider,private alertCtrl: AlertController, private userservice: UserserviceProvider) {

    sharedService.getBorrowInfo(navParams.data).then(data =>{ 
      console.log(data);
      this.item = data
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PairconfirmPage');
  }
  confirm(){
    this.sharedService.confirmBorrow(this.item.id,this.userservice.Username)    
    .then(data => { this.navCtrl.popToRoot()})    
    let alert = this.alertCtrl.create({
      title: 'ข้อความ',
      subTitle: 'คุณยืมสำเร็จ !',
      buttons: ['ตกลง']
    });
    alert.present();
  }
}
