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

  private idStand: number ;
  private exposants: Array<any> ;
  private rdvs: Array<{
    idStand: number, 
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
    this.idStand = this.navParams.get( "numStand" );

    if( this.idStand )
    {
      // Liste des exposants
      let sqlCommand = "SELECT DISTINCT etresur_18.idStand as idStand, exposant_18.id as idExposant, exposant_18.nom ";
      sqlCommand += "FROM exposant_18 ";
      sqlCommand += "JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
      sqlCommand += "WHERE etresur_18.idStand = " + this.idStand

      this.sqlPrd.select(sqlCommand, [], this.exposants ) ;
      
      // Liste des RDV
      sqlCommand = "SELECT DISTINCT rdv_18.id, exposant_18.nom as nomExposant, stand_18.id as idStand, rdv_18.duree, rdv_18.jour, rdv_18.heure, rdv_18.nom, rdv_18.nbMaxPlace, rdv_18.description, trancheage_18.libelle as age, typerdv_18.nom as typeRdv "
      sqlCommand += "FROM rdv_18 "
      sqlCommand += "LEFT JOIN stand_18 ON rdv_18.idStand = stand_18.id "
      sqlCommand += "LEFT JOIN trancheage_18 ON rdv_18.idTrancheAge = trancheage_18.id "
      sqlCommand += "JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id "
      sqlCommand += "JOIN exposant_18 ON rdv_18.idExposant = exposant_18.id "
      sqlCommand += "WHERE rdv_18.idStand = ? "
      sqlCommand += "ORDER BY rdv_18.jour DESC, rdv_18.heure ASC"

      this.sqlPrd.select(sqlCommand, [this.idStand], this.rdvs);
    }     
  }

  onExposantClick( exposant )
  {
    this.navCtrl.push( ExposantPage, {id: exposant.idExposant}) ;
  }

  onPlan()
  {
    let m = [new PlanMarqueur( this.idStand, "" )] ;
    this.navCtrl.push( PlansPage, {marqueurs: m} )
  }

  onFavoris()
  {
    this.favorisPrd.ajoute( this.idStand ) ;

    let toast = this.toastCtrl.create({
      message: 'Stand n° ' + this.idStand + ' ajouté aux favoris',
      duration: 1000 
    });
    toast.present();
  }

  onRdv( r )
  {
    this.navCtrl.push( UnRendezVousPage, {rdv: r} ) ;
  }

  onExposant (e) {
    this.navCtrl.push(ExposantPage, {id: e.idExposant});
  }

  onFavorisRDV( r )
  {
    console.log(r)
    let str = "RDV  " + r.nom + " " + r.date ;
    if( r.duree == "en continu") str += " en continu" ;
    else str += " à " + r.heure ;

    this.favorisPrd.ajoute( r.idStand, 999, str ) ;

    let toast = this.toastCtrl.create({
      message: 'Rendez-vous ajouté aux favoris.',
      duration: 1000 
    });
    toast.present();
  }
 
  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }
  

}
