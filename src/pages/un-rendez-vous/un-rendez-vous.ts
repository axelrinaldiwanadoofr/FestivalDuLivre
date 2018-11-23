import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from 'ionic-angular';
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

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
  private r: {id:number, numStand:number, titre:string, date:string, heure:string, duree: string, resume: string, age: string, type: string, nomExposant: string} ;
  public personne: Array<{nom: string, pernom: string}> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public favorisPrd: FavorisProvider,
    public sqlPrd: RemoteSqlProvider,
    public toastCtrl: ToastController ) 
  {
    this.personne = [] ;
  }

  ngOnInit()
  {
    this.r = this.navParams.get( "rdv" ) ;  
    this.onPersonne(this.r);
  }

  onPersonne(r){
    let sql = "SELECT nom, prenom FROM personne_18";  
    sql += " JOIN participer_18 ON personne_18.id = participer_18.idPersonne";   
    sql += " WHERE participer_18.idRDV = " + r.id ;      

    this.sqlPrd.select(sql, null, this.personne);
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
