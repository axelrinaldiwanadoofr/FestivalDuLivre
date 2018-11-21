import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from 'ionic-angular';
import { ExposantPage } from '../../pages/exposant/exposant' ;

/**
 * Generated class for the UnRendezVousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-un-rendez-vous',
  templateUrl: 'un-rendez-vous.html',
})
export class UnRendezVousPage implements OnInit
{
  private r: {numStand:number, titre:string, date:string, heure:string, duree: string, resume: string, age: string, type: string, nomExposant: string} ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
  }

  ngOnInit()
  {
    this.r = this.navParams.get( "rdv" ) ;    
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
  
  onRdvPlan(r)
  {
    let m = [] ;
    
      m.push( new PlanMarqueur( r.numStand, r.titre ) ) ;
    
    this.navCtrl.push( PlansPage, {marqueurs: m} ) ;
  }

  onFavoris( r )
  {
    let str = "RDV  " + r.titre + " " + r.date ;
    if( r.duree == "en continu") str += " en continu" ;
    else str += " à " + r.heure ;

    this.favorisPrd.ajoute( r.numStand, 999, str ) ;

    let toast = this.toastCtrl.create({
      message: 'Rdv ajouté aux favoris',
      duration: 1000 
    });
    toast.present();
  }

  onExposant(r)
  {
    this.navCtrl.push( ExposantPage, {id: r.idExposant}) ;
  }

}
