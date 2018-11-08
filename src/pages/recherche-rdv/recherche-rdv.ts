import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { ToastController } from 'ionic-angular';
import { UnRendezVousPage } from '../un-rendez-vous/un-rendez-vous' ;
import { AlertController } from 'ionic-angular';

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

  public mesRDV: Array<{idStand:number, nom:string, jour:string, heure:string, duree: string, description: string, age: string, type: string}>;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController ) 
  {

    this.themes = [] ;    
    this.sqlPrd.select( "SELECT * FROM theme_18 ORDER BY libelle", null, this.themes ) ;
 

    //let sql = "SELECT distinct TRANCHEAGE.id as id,libelle FROM TRANCHEAGE, RDV" ;
    //sql += " where TRANCHEAGE.id=RDV.idTrancheAge order by TRANCHEAGE.id" ;
    
    this.ages = [] ;
    let sql = "SELECT distinct trancheage_18.id as id, libelle";
    sql += " FROM trancheage_18";
    sql += " JOIN  rdv_18 ON  trancheage_18.id=rdv_18.idTrancheAge";
    sql += " ORDER BY trancheage_18.id" ;
    this.sqlPrd.select( sql, null, this.ages ) ;
    this.desTheme=[];

    /*let d: Date = new Date() ;

    if( !d.getDay()  ) this.unJour="dimanche";
    else this.unJour="samedi";*/

    //this.uneHeure= "" + d.getHours() + ":" + d.getMinutes() ;
    this.uneTranche=0;
    this.unTheme=0;
    this.uneTrancheAge=[];
    this.mesRDV=[];
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

  onSearch() {
    
      //test pour recuperer Variable
      
      
      /*let alert = this.alertCtrl.create({
      title: this.unJour,
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
      });
      alert.present();
    this.mesRDV=[];*/


    if( this.unTheme )
    {
      /*let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type" ;
      sql += " from rdv_18 " ;
      sql += " JOIN etresur_18 ON rdv_18.idStand=etresur_18.idStand JOIN concerner_18 ON etresur_18.idExposant=concerner_18.idExposant"
      sql += " left join trancheage_18 on rdv_18.idTrancheAge=trancheage_18.id" ;
      sql += " left join typerdv_18 on rdv_18.typeRDV=typerdv_18.id" ;
      sql += " WHERE concerner_18.idTheme=? AND rdv_18.jour=? AND rdv_18.heure>=?" ;
      sql += " order by jour desc, heure" ;*/
      
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      // sql +=" WHERE jour='samedi' AND heure='10:30:00' AND theme_18.libelle ='Littérature'";
      sql +=" WHERE jour='" + this.unJour + "' AND heure='" + this.uneHeure + "' AND theme_18.id =" + this.unTheme;

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }
    else if( this.uneTranche )
    {
      let sql = "select distinct r.idStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
      sql += " from RDV as r" ;
      sql += " JOIN EXPOSER ON r.idStand=EXPOSER.idStand JOIN CONCERNE ON EXPOSER.idExposant=CONCERNE.idExposant"
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

    if( this.unTheme && this.uneTranche )
    {
      let sql = "select distinct rdv_18.idStand, jour, heure, duree, nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.libelle as type" ;
      sql += " from rdv_18";
      sql += " JOIN etresur_18 ON rdv_18.idStand=etresur.idStand"; 
      sql += " JOIN concerner_18 ON etresur.idExposant=concerner_18.idExposant"
      sql += " left join trancheage_18 on rdv_18.idTrancheAge=trancheage_18.id" ;
      sql += " left join typerdv_18 on rdv_18.typeRDV=typerdv_18.id" ;
      sql += " WHERE concerner_18.idTheme=? AND rdv_18.idTrancheAge=? AND rdv_18.jour=? AND rdv_18.heure>=?" ;
      sql += " order by jour desc, heure" ;
    
      this.sqlPrd.select(sql, [this.unTheme,this.uneTranche,this.unJour,this.uneHeure], this.mesRDV);
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
      m.push( new PlanMarqueur( r.idStand, r.nom ) ) ;
    });
    this.navCtrl.push( PlansPage, {marqueurs: m} ) ;
  }

  onFavoris( r )
  {
    let str = "RDV  " + r.nom + " " + r.date ;
    if( r.duree == "en continu") str += " en continu" ;
    else str += " à " + r.heure ;

    this.favorisPrd.ajoute( r.idStand, 999, str ) ;

    let toast = this.toastCtrl.create({
      message: 'Rdv ajouté aux favoris',
      duration: 1000 
    });
    toast.present();
  }

}
