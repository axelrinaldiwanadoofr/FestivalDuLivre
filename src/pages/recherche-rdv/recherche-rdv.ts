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

  public typesRDV: Array<{id: number, nom: string}>;
  public unTypeRDV: number;

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
    this.typesRDV = [];
    this.ages = [] ;
    this.desTheme=[];

    let d: Date = new Date() ;

    if( !d.getDay()  ) this.unJour="dimanche";
    else this.unJour="samedi";

    this.uneHeure= d.getHours() + ":" + d.getMinutes() ;
    this.uneTranche=0;
    this.unTheme=0;
    this.uneTrancheAge=[];
    this.unTypeRDV=0;
    this.mesRDV=[];
  }

  ngOnInit () {
    this.sqlPrd.select( "SELECT * FROM theme_18 ORDER BY libelle", null, this.themes) ;

    let sql = "SELECT distinct trancheage_18.id as id, libelle";
    sql += " FROM trancheage_18";
    sql += " JOIN  rdv_18 ON  trancheage_18.id=rdv_18.idTrancheAge";
    sql += " ORDER BY trancheage_18.id" ;
    this.sqlPrd.select( sql, null, this.ages ) ;

    this.sqlPrd.select( "SELECT * FROM typerdv_18 ORDER BY nom", null, this.typesRDV) ;

    console.log(this.typesRDV);

  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

  onSearch() {


    if( this.unTheme )
    {
      this.mesRDV = [] ;
      //
      // Recherche par theme
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "' AND theme_18.id =" + this.unTheme;
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }
    else if( this.uneTranche )
    {
      this.mesRDV = [] ;
      //
      // Recherche par Tranche d'age
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "' AND trancheage_18.id =" + this.uneTranche;
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }
    else if( this.unTypeRDV )
    {
      this.mesRDV = [] ;
      //
      // Recherche par type de rendez vous
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "' AND typerdv_18.id =" + this.unTypeRDV;
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }
    else 
    {
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
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }

    if( this.unTheme && this.uneTranche )
    {
      this.mesRDV = [] ;
      //
      // Recherche par theme et par tranche d'age
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "' AND trancheage_18.id =" + this.uneTranche + " AND theme_18.id =" + this.unTheme;
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
    }

    if( this.unTheme && this.uneTranche && this.unTypeRDV)
    {
      this.mesRDV = [] ;
      //
      // Recherche par theme, tranche d'age et type de rendez vous
      //
      let sql = "SELECT distinct rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, description, trancheage_18.libelle as age, typerdv_18.nom as type";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" WHERE jour='" + this.unJour + "' AND heure>='" + this.uneHeure + "' AND trancheage_18.id =" + this.uneTranche + " AND theme_18.id =" + this.unTheme + " AND typerdv-18.id =" + this.unTypeRDV;
      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV).then((data) => {
        console.log(data);
      });
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
