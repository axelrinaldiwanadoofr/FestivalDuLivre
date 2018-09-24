import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { PlansPage, PlanMarqueur} from '../plans/plans';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ExposantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exposant',
  templateUrl: 'exposant.html',
})
export class ExposantPage implements OnInit 
{

  public id: number ;
  public libelle: string ;

  public stands: Array<{numStand: number, numHall: number}> ;
  public intervenants: Array<{nom: string, prenom: string, jour: string}> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
    this.stands = [] ;
    this.intervenants = [] ;
  }

  ngOnInit()
  {
    let id = this.navParams.get( "id" ) ;
    if( id )
    {
      this.sqlPrd.select( "SELECT id, libelle FROM EXPOSANT where id=?", [id] ).then( (data)=>
      {
        let e = data.rows[0] ;
        if( e )
        {
          this.id = e.id ;
          this.libelle = e.libelle ;
        }
        // Liste des stands
        this.sqlPrd.select( "select * from EXPOSER where idExposant=?", [id]).then((data)=>
        {
          data.rows.forEach( (s)=>
          {
            this.stands.push( {numStand: s.numStand, numHall: s.numStand.substr(0,1)} ) ;
          })
        }) ;

        // Liste des intervenants
        let sql = "select nom, prenom, jour from INTERVENANT, SERA_PRESENT"
        sql += " where id=numIntervenant and num_exposant=?"
        sql += " order by nom, prenom" ;
        this.sqlPrd.select( sql, [id], this.intervenants ) ;
      }) ;
    }
  }

 onPlan()
 {
    let m = [] ;
    this.stands.forEach( (es)=>
    {
      m.push( new PlanMarqueur( es.numStand, this.libelle )) ;
    }) ;
    this.navCtrl.push( PlansPage, {marqueurs: m} )
 }

 onFavoris()
 {
    this.stands.forEach( (s)=>
    {
      this.favorisPrd.ajoute( s.numStand, this.id, this.libelle ) ;      
    })

   let toast = this.toastCtrl.create({
     message: 'Exposant ' + this.libelle + ' ajouté aux favoris',
     duration: 1000 
   });
   toast.present();
 }


  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
