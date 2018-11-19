import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { LivrePage } from '../../pages/livre/livre';
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

export class RechercheLivrePage implements OnInit {
  private recherche: RechercheLivreCriteres;
  private livres: Array<any>;
  private themes: Array<{ id: string, libelle: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider) {
    this.recherche = new RechercheLivreCriteres();
    this.livres = [];
    this.themes = [];
  }


  ngOnInit() {
    // Charge les thèmes
    let sql = "SELECT * FROM theme_18 ORDER BY libelle";
    this.sqlPrd.select(sql, null, this.themes);
  }

  onRecherche() {
    this.livres = [];

    // requête titre et thèmes remplis
    if (this.recherche.titre && this.recherche.themeId) {
      let sql = "SELECT * "
      sql += "FROM (livre_18 JOIN concerner_18 ON livre_18.id=concerner_18.idLivre) "
      sql += "JOIN theme_18 ON concerner_18.idTheme = theme_18.id "
      sql += "WHERE theme_18.id=" + this.recherche.themeId
      sql += " AND titre LIKE '" + '%' + this.recherche.titre + '%' + "' "
      sql += "ORDER BY titre"

      this.sqlPrd.select(sql, null, this.livres);
    }
    // requête titre remplis
    else
    {
      let sql = "SELECT * "
      sql += "FROM livre_18 "
      sql += "WHERE titre LIKE '" + '%' + this.recherche.titre + '%' + "' "
      sql += "ORDER BY titre"
      this.sqlPrd.select( sql , null, this.livres);
    }
  }

  // si clic sur un livre de la liste affichée par la requête
  onLivreClick(livre) {
    this.navCtrl.push(LivrePage, { idLivre: livre.idLivre, titre: livre.titre });
  }

  Accueil() {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}


export class RechercheLivreCriteres {
  public titre: string;
  public themeId: string;
}