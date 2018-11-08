import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql' ;
import { LivrePage } from '../../pages/livre/livre' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the RechercheLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recherche-livre',
  templateUrl: 'recherche-livre.html',
})

export class RechercheLivrePage implements OnInit
{  
  private recherche: RechercheLivreCriteres ;
  private livres: Array<any> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider ) 
  {
    this.recherche = new RechercheLivreCriteres() ;
    this.livres = [] ;
  }


  ngOnInit(){}

  onRecherche()
  {
    this.livres = [] ;
    
    if( this.recherche.titre )
    {
      let titre = '%' + this.recherche.titre.toLocaleUpperCase() + '%'
      let sql = "SELECT idLivre, titre, enResume, auteur, editeur, idExposant FROM LIVRE_18 WHERE idLivre=idLivre and lower(titre) like ? ORDER BY titre"
    }
    else
    {
      let sql = "SELECT idLivre, titre, enResume, auteur, editeur, idExposant FROM LIVRE_18 WHERE idLivre=idLivre ORDER BY titre"
      this.sqlPrd.select( sql , null, this.livres);
    }
  }

  onLivreClick( livre ) 
  {
    this.navCtrl.push( LivrePage, {idLivre: livre.idLivre} ) ;
  }

 Accueil(){
  this.navCtrl.setRoot(HelloIonicPage);
}
}


export class RechercheLivreCriteres
{
  public titre: string ;
}