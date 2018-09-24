import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from 'ionic-angular';
import { UnRendezVousPage } from '../../pages/un-rendez-vous/un-rendez-vous' ;

/**
 * Generated class for the UnepersonnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unepersonne',
  templateUrl: 'unepersonne.html',
})
export class UnePersonnePage implements OnInit
{
  private unePersonne:  {id:number,nom:string,prenom:string} ;
  private dedicaces: Array<{id:number, numstand: number, libelle: string, jour: string}> ;
  private rdv: Array<{numStand: number, date: string, heure: string, duree: string, titre: string, resume: string, age: string, type: string }>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
    this.unePersonne = this.navParams.get( "personne" ) ;
    this.dedicaces = [] ;
    this.rdv = [] ;
  }

  ngOnInit()
  {
    // Liste des dédicaces
    let sql = "select id, numstand, libelle, jour from EXPOSANT, SERA_PRESENT, EXPOSER"
    sql += " where id=num_exposant and numIntervenant=?"
    sql += " and idExposant=id"
    sql += " order by libelle" ;
    this.sqlPrd.select( sql, [this.unePersonne.id], this.dedicaces ) ;

    // Liste des rdv
    sql = "select distinct numStand, date, heure, duree, titre, resume, ta.libelle as age, tr.libelle as type" ;
    sql += " from RDV as r" ;
    sql += " inner join PARTICIPER as pa on pa.idRdv=r.id" ;
    sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
    sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
    sql += " where pa.idIntervenant=?" ;
    sql += " order by date desc, heure" ;
    this.sqlPrd.select( sql, [this.unePersonne.id], this.rdv ) ;
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

  onDedicacesPlan()
  {
    let m = [] ;
    this.dedicaces.forEach( (d)=>
    {
      m.push( new PlanMarqueur( d.numstand, d.libelle )) ;
    }) ;
    this.navCtrl.push( PlansPage, {marqueurs: m} )
  }

  onRdvPlan()
  {
    let $this = this ;
    let m = [] ;
    this.rdv.forEach( (r)=>
    {
      m.push( new PlanMarqueur( r.numStand, $this.unePersonne.nom + " " + $this.unePersonne.prenom )) ;
    }) ;
    this.navCtrl.push( PlansPage, {marqueurs: m} )
  }
  
  onFavoris()
  {
    this.dedicaces.forEach( (d)=>
    {
      this.favorisPrd.ajoute( d.numstand, d.id, 
        this.unePersonne.nom + " " + this.unePersonne.prenom + " dédicace chez " + d.libelle ) ;
    }) ;

    let r = this.rdv[0] ;
    if( r )
    {
      this.favorisPrd.ajoute( r.numStand, 999, 
        "RDV avec " + this.unePersonne.nom + " " + this.unePersonne.prenom + " pour " + r.titre ) ;
    }

    let toast = this.toastCtrl.create({
      message: 'Rdv avec ' + this.unePersonne.nom + " " + this.unePersonne.prenom + ' ajouté aux favoris',
      duration: 1000 
    });
    toast.present();
  }

  onRdv( r )
  {
    this.navCtrl.push( UnRendezVousPage, {rdv: r}) ;
  }

}
