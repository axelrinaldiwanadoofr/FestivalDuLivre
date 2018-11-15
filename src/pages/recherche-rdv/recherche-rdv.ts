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

    this.mesRDV = [] ;

      //
      // Recherche si l'utilisateur ne saisi ni tranche d'age ni theme
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "'";
      

      if(this.unTheme != 0){
        sql += " AND theme_18.id = " + this.unTheme; 
      }

      if(this.unTypeRDV != 0){
        sql += " AND typerdv_18.id = " + this.unTypeRDV;
      }

      if(this.uneTranche != 0){
        sql += " AND trancheage_18.id = " + this.uneTranche;
      }

      sql += " order by jour desc, heure";
      this.sqlPrd.select(sql, null, this.mesRDV);
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
