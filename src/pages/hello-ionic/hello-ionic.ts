import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecherchePage} from '../recherche/recherche';
import { PlansPage} from '../plans/plans';
import { lyceePage} from '../lycee/lycee';
import { RestaurantsPage} from '../restaurants/restaurants';
import { PresentationPage} from '../presentation/presentation';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  
})


export class HelloIonicPage {
  public rdv : Array<{titre : string,heure : string,numStand: number, libelle : string, date : string}>
  datesamedi : Date;
  datedimanche : Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider) {    
  this.rdv = [];
    
    this.sqlPrd.select( "select titre,heure,numStand, libelle from RDV,TRANCHEAGE where RDV.idTrancheAge=TRANCHEAGE.id AND heure > CURRENT_TIME AND datebis = CURRENT_DATE order by heure ASC limit 3", null, this.rdv );
  }
  recherche(){
    this.navCtrl.push(RecherchePage,null);
  }
  plan(){
    this.navCtrl.push(PlansPage,null);
  }
  restaurants(){
    this.navCtrl.push(RestaurantsPage,null);
  }
  presentation(){
    this.navCtrl.push(PresentationPage,null);
  }
  lycee(){
    this.navCtrl.push(lyceePage,null);
  }
}


