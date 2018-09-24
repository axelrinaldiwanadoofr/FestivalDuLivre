import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql' ;
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from 'ionic-angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { UnRendezVousPage } from '../../pages/un-rendez-vous/un-rendez-vous' ;

/**
 * Generated class for the StandListExposantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stand-list-exposant',
  templateUrl: 'stand-list-exposant.html',
})
export class StandListExposantPage implements OnInit
{

  private numStand: number ;
  private exposants: Array<any> ;
  private rdvs: Array<{
    numStand: number, 
    date: string, 
    heure: string, 
    duree: string, 
    titre: string, 
    nbPlaceMax: number, 
    resume: string, 
    age: string, 
    type: string}> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
    this.exposants = [] ;
    this.rdvs = [] ;
  }

  ngOnInit()
  {
    this.numStand = this.navParams.get( "numStand" ) ;

    if( this.numStand )
    {
      let sql = "select numstand, idExposant, libelle from EXPOSANT, EXPOSER where id=idExposant and numstand=?" ;
      this.sqlPrd.select( sql, [this.numStand], this.exposants ) ;

      sql = "select distinct numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
      sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
      sql += " where numStand=?" ;
      sql += " order by date desc, heure" ;
      
      //sql = "select distinct numStand, date, heure, duree, titre, nbPlaceMax, resume" ; 
      //sql += " from RDV as r" 
      //sql += " where numStand=?"
      //sql += " order by date desc, heure"
          
      this.sqlPrd.select( sql, [this.numStand], this.rdvs ) ;
    }     
  }

  onExposantClick( exposant )
  {
    this.navCtrl.push( ExposantPage, {id: exposant.idExposant}) ;
  }

  onPlan()
  {
    let m = [new PlanMarqueur( this.numStand, "" )] ;
    this.navCtrl.push( PlansPage, {marqueurs: m} )
  }

  onFavoris()
  {
    this.favorisPrd.ajoute( this.numStand ) ;

    let toast = this.toastCtrl.create({
      message: 'Stand n° ' + this.numStand + ' ajouté aux favoris',
      duration: 1000 
    });
    toast.present();
  }

  onRdv( r )
  {
    this.navCtrl.push( UnRendezVousPage, {rdv: r} ) ;
  }
 
  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }
  

}
