import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username : string;
  login(){
    this.userservice.Username = this.username;
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private userservice: UserserviceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
