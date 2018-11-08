import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FavorisProvider } from '../../providers/favoris/favoris';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the LivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livre',
  templateUrl: 'livre.html',
})
export class LivrePage implements OnInit 
{
  public idLivre: number ;
  public titre: string ;
  public enResume: string ;
  public auteur: string ;
  public editeur: string ;
  public idExposant: number ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController ) 
  {
  }

  ngOnInit()
  {
    let id = this.navParams.get( "idLivre" ) ;
    if(id)
    {
      this.sqlPrd.select( "SELECT idLivre, titre, enResume, auteur, editeur, idExposant FROM Livre_18 WHERE idLivre=?", [id] ).then( (data)=>
      {
        let livre = data.rows[0] ;
        if( livre )
        {
          this.idLivre = livre.idLivre;
          this.titre = livre.titre;
          this.enResume = livre.enResume;
          this.auteur = livre.auteur;
          this.editeur = livre.editeur;
          this.idExposant = livre.idExposant;
        }
      }) ;
    }
  }


//  onFavoris()
//  {
//     this.stands.forEach(s =>
//     {
//       this.favorisPrd.ajoute( s.numStand, this.idLivre, this.titre ) ;      
//     })

//    let toast = this.toastCtrl.create({
//      message: this.titre + ' est ajouté aux favoris',
//      duration: 1000 
//    });
//    toast.present();
//  }


  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
