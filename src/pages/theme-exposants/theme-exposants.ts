import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { PlansPage, PlanMarqueur} from '../plans/plans';

/**
 * Generated class for the ThemeExposantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-theme-exposants',
  templateUrl: 'theme-exposants.html',
})
export class ThemeExposantsPage {
  public selectedItem:any;
  public tab : Array<{numStand: number, id: string, libelle : string}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd:RemoteSqlProvider) {
    this.selectedItem=navParams.get('item');
    this.tab = [];
  }

  ngOnInit()
  {
   /* let sql = "SELECT numStand, e.id as id, libelle " ;
    sql += " FROM EXPOSANT as e, CONCERNE as c, EXPOSER as er" ;
    sql += " WHERE c.idExposant = e.id AND e.id=er.idExposant AND idTheme = ?" ;
    sql += " ORDER BY libelle" ; 
    this.sqlPrd.select( sql, [this.selectedItem.id], this.tab);*/

    let sql = "SELECT exposant_18.id, nom " ;
    sql += " FROM exposant_18 JOIN presenter_18 ON exposant_18.id = presenter_18.idExposant";
    sql += " JOIN theme_18 ON presenter_18.idTheme = theme_18.id";
    sql += " WHERE idTheme = " + this.selectedItem.id;
    sql += " ORDER BY nom" ; 

    this.sqlPrd.select( sql, null, this.tab);
  }
   
  


  accueil(){
    this.navCtrl.push(HelloIonicPage, null);
  }

  onExposant( exposant )
  {
    this.navCtrl.push( ExposantPage, {id: exposant.id} ) ;
  }

  onPlan()
  {
    let m = [] ;
    this.tab.forEach( (es)=>
    {
      m.push( new PlanMarqueur( es.numStand, es.libelle )) ;
    }) ;
     this.navCtrl.push( PlansPage, {marqueurs: m} )      
  }

  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }

}
