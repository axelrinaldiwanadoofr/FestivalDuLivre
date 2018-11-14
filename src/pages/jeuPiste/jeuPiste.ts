import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Enigme } from '../jeuPiste/enigmes/enigme1/enigme1';

/**
 * Generated class for the RestaurantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-jeuPiste',
    templateUrl: 'jeuPiste.html',
})
export class jeuPistePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
 
    ionViewDidLoad() {
        console.log('ionViewDidLoad jeuPistePage');
    }

    onClickDebutJeu()
  {
    this.navCtrl.push(Enigme);
  }

  saveAnswer()
  {
      
  }

}