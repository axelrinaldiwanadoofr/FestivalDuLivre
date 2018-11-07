import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql' ;
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the RechercheExposantPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-exposant-plan',
  templateUrl: 'recherche-exposant-plan.html',
})

export class RechercheExposantPlanPage implements OnInit
{  
  private recherche: RechercheExposantCriteres ;
  private exposants: Array<any> ;
  private marqueurs: Array<PlanMarqueur> ;
  private themes: Array<{id: string, libelle: string}> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider ) 
  {
    this.recherche = new RechercheExposantCriteres() ;
    this.exposants = [] ;
    this.marqueurs = [] ;
    this.themes = [] ;
  }

  ngOnInit()
  {
    // Charge les thèmes
    let sql = "select id, libelle from THEME order by libelle" ;
    this.sqlPrd.select( sql, null, this.themes ) ;

  }

  onRecherche()
  {
    this.exposants = [] ;
    this.marqueurs = [] ;

    if (this.recherche.libelle && this.recherche.themeId)
    {
      console.log("ok");
    }
    else if( this.recherche.libelle )
    {
      let libelle = '%' + this.recherche.libelle.toLocaleUpperCase() + '%'
      let sql;
      sql += "select numstand, id, libelle"
      sql += "from EXPOSANT, EXPOSER"
      sql += "where id = idExposant and lower(libelle)"
      sql += "like ? order by libelle"
      this.sqlPrd.select( sql, [libelle], this.exposants ).then((data)=>
      {
        this.exposants.forEach( (e)=>
        {
          this.marqueurs.push( new PlanMarqueur( e.numstand, e.libelle) ) ;
        }) ;
      }) ;
    }
    else if( this.recherche.themeId )
    {
      let sql = "select numstand, id, libelle" ;
      sql += " from EXPOSANT as et, EXPOSER as er, CONCERNE as c" ;
      sql += " where et.id=er.idExposant and et.id=c.idExposant and c.idTheme=?" ;
      sql += " order by libelle" ;
      this.sqlPrd.select( sql , [this.recherche.themeId], this.exposants ).then((data)=>
      {
        this.exposants.forEach( (e)=>
        {
          this.marqueurs.push( new PlanMarqueur( e.numstand, e.libelle) ) ;
        }) ;
      }) ;      
    }
    else
    {
      let sql = "select idStand, id, nom from EXPOSANTS_18 JOIN etresur_18 ON id=idExposant order by nom"
      this.sqlPrd.select( sql , null, this.exposants ) ;
    }
  }

  onExposantClick( exposant ) 
  {
    this.navCtrl.push( ExposantPage, {id: exposant.id} ) ;
  }

  onPlan()
  {
    this.navCtrl.push( PlansPage, {marqueurs: this.marqueurs} )
  }

 Accueil(){
  this.navCtrl.setRoot(HelloIonicPage);
}
}


export class RechercheExposantCriteres
{
  public libelle: string ;
  public themeId: string ;
}