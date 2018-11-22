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
  private trancheAges: Array<{ id: string, libelle: string }>;
  private auteurs: Array<string>
  private editeurs: Array<string>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider)
    {
    this.recherche = new RechercheLivreCriteres();
    this.livres = [];
    this.themes = [];
    this.trancheAges = [];
    this.auteurs = [];
    this.editeurs = [];
  }


  ngOnInit() {
    
    // Charge les thèmes
    let sql = "SELECT * FROM theme_18 ORDER BY libelle";
    this.sqlPrd.select(sql, null, this.themes);

    // Charge les tranches d'ages
    sql = "SELECT * FROM trancheage_18 ORDER BY id";
    this.sqlPrd.select(sql, null, this.trancheAges);

    // Charge les auteurs
    sql = "SELECT distinct auteur FROM livre_18 ORDER BY auteur";
    this.sqlPrd.select(sql, null, this.auteurs);

    // Charge les editeurs
    sql = "SELECT distinct editeur FROM livre_18 ORDER BY editeur";
    this.sqlPrd.select(sql, null, this.editeurs);
    
    // // Charge les stands
    // sql = "SELECT * FROM stand_18";
    // this.sqlPrd.select(sql, this.stands);

    // Afficher la liste dès l'arrivée sur la page
    sql = "SELECT l.id as id, titre, editeur, auteur, libelle, l.image as image, nom, idStand AS numStand ";
    sql += "FROM livre_18 as l, theme_18 as t, exposant_18 as e, etresur_18 AS et ";
    sql += "WHERE l.idTheme = t.id and l.idExposant = e.id "
    sql += "AND et.idExposant = l.idExposant " ;
    sql += "ORDER BY l.titre" ;
    this.sqlPrd.select( sql, [], this.livres) ;
  }

  onRechercheClick() {
    this.livres = [];

    let sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, nom, idTrancheAge, idStand AS numStand ";
    sql += "FROM livre_18 aS l, theme_18 AS t, exposant_18 AS e, etresur_18 AS et ";
    sql += "WHERE l.idTheme = t.id and l.idExposant = e.id ";
    sql += "AND et.idExposant = l.idExposant ";
    // requête si titre rempli
    if (this.recherche.titre ) 
    {
      sql += " AND titre LIKE '" + '%' + this.recherche.titre + '%' + "' " ;
    }
  // requête si auteur rempli
    if (this.recherche.auteur && this.recherche.auteur != "0" ) 
    {
      sql += " AND auteur LIKE '" + '%' + this.recherche.auteur + '%' + "' " ;
    }
    // requête si editeur rempli
    if (this.recherche.editeur && this.recherche.editeur != "0" ) 
    {
      sql += " AND editeur LIKE '" + '%' + this.recherche.editeur + '%' + "' " ;
    }
    // requête si theme rempli
    if( this.recherche.themeId && this.recherche.themeId != "0" ) 
    {
      sql += " AND idTheme=" + this.recherche.themeId ;
    }
    // requête si tranche d'âge rempli
    if( this.recherche.trancheAgeId && this.recherche.trancheAgeId != "0" ) 
    {
      sql += " AND idTrancheAge=" + this.recherche.trancheAgeId ;
    }
    // classé par titre
    sql += " ORDER BY titre" ;
    this.sqlPrd.select(sql, null, this.livres);
  }

  // si clic sur un livre de la liste affichée par la requête
  onLivreClick(livre) {
    this.navCtrl.push(LivrePage, { idLivre: livre.id });
  }

  Accueil() {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}


export class RechercheLivreCriteres {
  public titre: string;
  public themeId: string;
  public exposantId: number ;
  public trancheAgeId: string ;
  public auteur: string ;
  public editeur: string ;
}