import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { ToastController } from 'ionic-angular';
import { UnRendezVousPage } from '../un-rendez-vous/un-rendez-vous' ;


/**
 * Generated class for the RechercheRdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-rdv',
  templateUrl: 'recherche-rdv.html',
})
export class RechercheRdvPage {
  
  public themes: Array<{id: number, libelle: string}> ;
  public ages: Array<{id: number, libelle: string}> ;

  public desTheme: Array<{id:number}>;
  public unJour: string;
  public uneHeure :string;
  public uneTranche:number;
  public unTheme:number;
  public uneTrancheAge : Array<{id:number}>;

  public mesRDV: Array<{numStand:number, titre:string, date:string, heure:string, duree: string, resume: string, age: string, type: string}>;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
    this.themes = [] ;    
    this.sqlPrd.select( "SELECT * FROM THEME order by libelle", null, this.themes ) ;
    this.ages = [] ;

    let sql = "SELECT distinct TRANCHEAGE.id as id,libelle FROM TRANCHEAGE, RDV" ;
    sql += " where TRANCHEAGE.id=RDV.idTrancheAge order by TRANCHEAGE.id" ;
    this.sqlPrd.select( sql, null, this.ages ) ;
    this.desTheme=[];

    let d: Date = new Date() ;

    if( !d.getDay()  ) this.unJour="dimanche";
    else this.unJour="samedi";

    this.uneHeure= "" + d.getHours() + ":" + d.getMinutes() ;
    this.uneTranche=0;
    this.unTheme=0;
    this.uneTrancheAge=[];
    this.mesRDV=[];
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

  onSearch() {
    this.mesRDV=[];

    if( this.unTheme && this.uneTranche )
    {
      let sql = "select distinct r.numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " JOIN EXPOSER ON r.numStand=EXPOSER.numStand JOIN CONCERNE ON EXPOSER.idExposant=CONCERNE.idExposant"
      sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
      sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
      sql += " WHERE CONCERNE.idTheme=? AND r.idTrancheAge=? AND r.date=? AND r.heure>=?" ;
      sql += " order by date desc, heure" ;
    
      this.sqlPrd.select(sql, [this.unTheme,this.uneTranche,this.unJour,this.uneHeure], this.mesRDV);
    }
    if( this.unTheme )
    {
      let sql = "select distinct r.numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " JOIN EXPOSER ON r.numStand=EXPOSER.numStand JOIN CONCERNE ON EXPOSER.idExposant=CONCERNE.idExposant"
      sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
      sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
      sql += " WHERE CONCERNE.idTheme=? AND r.date=? AND r.heure>=?" ;
      sql += " order by date desc, heure" ;
    
      this.sqlPrd.select(sql, [this.unTheme,this.unJour,this.uneHeure], this.mesRDV);
    }
    else if( this.uneTranche )
    {
      let sql = "select distinct r.numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " JOIN EXPOSER ON r.numStand=EXPOSER.numStand JOIN CONCERNE ON EXPOSER.idExposant=CONCERNE.idExposant"
      sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
      sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
      sql += " WHERE r.idTrancheAge=? AND r.date=? AND r.heure>=?" ;
      sql += " order by date desc, heure" ;
    
      this.sqlPrd.select(sql, [this.uneTranche,this.unJour,this.uneHeure], this.mesRDV);
    }
    else 
    {
      let sql = "select distinct r.numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " JOIN EXPOSER ON r.numStand=EXPOSER.numStand JOIN CONCERNE ON EXPOSER.idExposant=CONCERNE.idExposant"
      sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
      sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
      sql += " WHERE r.date=? AND r.heure>=?" ;
      sql += " order by date desc, heure" ;
    
      this.sqlPrd.select(sql, [this.unJour,this.uneHeure], this.mesRDV);
    }
    
  }

  onUnRendezVous( r )
  {
    this.navCtrl.push( UnRendezVousPage, {rdv: r}) ;
  }

  onPlan()
  {
    let m = [] ;
    this.mesRDV.forEach( (r)=>
    {
      m.push( new PlanMarqueur( r.numStand, r.titre ) ) ;
    });
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

}
