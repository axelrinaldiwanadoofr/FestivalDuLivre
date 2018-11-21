import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../../../providers/remotesql/remotesql';

@IonicPage()
@Component({
  selector: 'page-jeuPiste',
  templateUrl: 'enigme1.html'
})
export class Enigme1 {

  public lesEnigmes: Array<{ title: string, description: string, day: number, numStand: number, reponse: Array<string>, code: string[6], commentaireFin: string, image: string }>;


  public compteurReponse: number;
  public todo: any;
  public index: number;
  public codeBon: boolean;
  public reponseBonne: boolean;
  public erreurCode: boolean;
  public erreurRep: boolean;
  public reponseValidee: boolean;
  public repAValider: boolean;
  public afficherIntitulé: boolean;
  public afficherImage: boolean;
  public messageFin: boolean;

  // Tab des dates
  public laDate: string;

  public codeEnigme: string;
  public reponseDonnee: string;





  constructor(public navCtrl: NavController, public sqlPrd: RemoteSqlProvider, public navParams: NavParams) {
    this.laDate = new Date().getDate().toString();
    console.log(this.laDate);
    this.lesEnigmes = [
      //Jour 2 
      //Enigme 1
      {
        title: "", description: "Modeste employé de bureau,<br/>Notant jadis sur ses tablettes,<br/>Pouvant porter une palette,<br/>Et qui déchiffre les rouleaux.<br/><br/>Qui est-il ?",
        day: 2, numStand: 100, reponse: ["SCRIBE", "scribe", "yousk2", "le scribe", "le Scribe", "Le scribe", "Le Scribe", "LE SCRIBE"],
        code: "md7at1", commentaireFin: "En Égypte ancienne, personnage important d'une administration chargé de la rédaction de divers textes.<br/>Dans les écrits du Nouveau Testament, docteur juif, interprète officiel des saintes Écritures.", image: null
      },
      //Enigme 2
      {
        title: "AVOCAT", description: "Déchiffrez le code : <br/>LKMRS-LYEJYEU",
        day: 2, numStand: 201, reponse: [ "BACHI-BOUZOUK","yousk2", "bachi-bouzouk", "Bachi-bouzouk", "Bachi-Bouzouk", "BACHI BOUZOUK", "bachi bouzouk", "Bachi bouzouk", "Bachi Bouzouk"],
        code: "h5cr2h", commentaireFin: "Bachi-Bouzouk : cavalier mercenaire de l'armée de l'Empire ottoman, souvent d'origine albanaise. Les bachi-bouzouk participèrent notamment au siège de Vienne.", image: null
      },
      //Enigme 3
      {
        title: "Rébus", description: "Quel est ce mot ?",
        day: 2, numStand: 340, reponse: ["ENCYCLOPEDISTE", "L'ENCYCLOPEDISTE", "L'ENCYCLOPÉDISTE", "yousk2", "encyclopediste", "Encyclopediste", "Encyclopédiste", "encyclopédiste", "ENCYCLOPÉDISTE", "l'ecyclopediste", "l'encyclopédiste", "l'Ecyclopediste", "l'Encyclopédiste", "L'ecyclopediste", "L'encyclopédiste", "L'Ecyclopediste", "L'Encyclopédiste"],
        code: "4gla2x", commentaireFin: "Définition : <br/>Auteur ou collaborateur d'une encyclopédie.", image: "assets/img/imgEnigmes/rebusOeufs.png"
      },
      //Enigme 4
      {
        title: "Dingbat", description: "Quel est cet adjectif ? ",
        day: 2, numStand: 426, reponse: ["IRREVERSIBLE", "Irréversible", "yousk2", "irréversible", "irreversible", "Irreversible", "IRRÉVERSIBLE"],
        code: "yf8t2d", commentaireFin: "Irréversible ( i ré vert si bleu) : Qui suit un processus qu'on ne peut ni enrayer ni renverser : Mouvement, maladie irréversible.", image: "assets/img/imgEnigmes/iresi.png"
      },
      //Enigme 5
      {
        title: "Un fait impromptu", description: "Cet imprévisible évènement,<br/>Qu'on appelle aussi aléa.<br/>Apporte des bouleversements,<br/>Surtout quand on ne l'attend pas.<br/><br/>Qui est-il ?",
        day: 2, numStand: 500, reponse: [ "HASARD","Hasard", "yousk2", "hasard", "le hasard", "le Hasard", "Le hasard", "Le Hasard", "LE HASARD"],
        code: "nhe8wz", commentaireFin: "Puissance considérée comme la cause d'événements apparemment fortuits ou inexplicables : Rien n'a été laissé au hasard.", image: null
      },
      //Enigme 6
      {
        title: "Charade atténuée", description: "Mon premier est la 5éme lettre de l’alphabet<br/>Mon deuxième est l’alliée de Peter Pan<br/>Mon troisième est élue dans un concours de beauté<br/>Mon quatrième est un pronom personnel<br/><br/>Mon tout est une figure de style",
        day: 2, numStand: 416, reponse: ["EUPHÉMISME", "yousk2", "euphemisme", "Euphemisme", "Euphémisme", "euphémisme", "l'euphemisme", "L'euphemisme", "l'Euphemisme", "L'Euphemisme", "l'euphémisme", "L'euphémisme", "l'Euphémisme", "L'Euphémisme", "L'EUPHEMISME",  "L'EUPHÉMISME"],
        code: "f7ezf5", commentaireFin: "Euphémisme (E-fée-miss-me). Elle permet de rendre une réalité moins brutale.", image: null
      },
      //Enigme 7
      {
        title: "Un peu de clacul...", description: "_ _ U _ _ _ E _ _<br/>  +<br/>T _ _ C _ _ _ N _<br/>  +<br/> _ R _ _ U _ _ _ _<br/>  +<br/>_ _ _ _ _ L _ _ T ",
        day: 2, numStand: 320, reponse: ["TRUCULENT","yousk2", "truculent",  "Truculent"],
        code: "kf8s3y", commentaireFin: "Truculent adj. :  On qualifie ainsi un style qui n'hésite pas à employer des mots crus, grossiers, ou des mots violents.", image: null
      },
      //Enigme 8
      {
        title: "Mystère final", description: "Je suis un poète français maudit,<br/>Ayant un époux infernal,<br/>J’écris des recueils.<br/><br/>Qui suis-je ?",
        day: 2, numStand: 235, reponse: ["PAUL VERLAINE", "yousk2", "Paul VERLAINE",  "Paul Verlaine", "paul verlaine", "Paul verlaine", "paul Verlaine", "verlaine", "Verlaine", "VERLAINE"],
        code: "4frt8d", commentaireFin: " Paul Verlaine est un poète français né à Metz le 30 mars 1844, il est décédé à Paris le 8 janvier 1896. Il abandonne sa femme pour suivre Rimbaud en Angleterre et en Belgique. Mais les relations entre ces deux hommes trop différents sont orageuses : En 1873 Verlaine blesse Rimbaud avec un révolver et sera condamné à deux ans de prison. Il se convertit au catholicisme pendant sa détention, et il écrit plusieurs poèmes de Sagesse.", image: null
      }
    ];
    if (this.laDate == "21") {
      this.lesEnigmes = [
        //Jour 1 
        //Enigme 1
        {
          title: "Il était une fois...", description:
          "Toujours le premier, <br/> Jamais le dernier.<br/> Rien sans lui n'est jamais fini, <br/> Car rien ne peut commencer sans lui.<br/><br/>  Qui est-il ?",
          day: 1, numStand: 100, reponse: ["DEBUT","début", "debut", "Début", "Debut", "le début", "le debut",  "LE DEBUT", "Le Debut", "Le Début", "le Début", "le Debut", "Le début", "LE DÉBUT", "le DÉBUT", "Le DÉBUT", "le DEBUT", "Le DEBUT", "yousk2"],
          code: "md7at1", commentaireFin: "Le début amorce l'histoire et ne permet pas de finir quoi que ce soit s'il n'est pas présent. ",
          image: null
        },
        //Enigme 2
        {
          title: "AVOCAT", description:
          "Déchiffrez le code : <br/>OHYBNO",
          day: 1, numStand: 201, reponse: ["EXORDE", "exorde", "éxorde", "l'exorde", "L'exorde", "l'éxorde", "L'éxorde", "l'Éxorde", "L'Éxorde", "L'ÉXORDE", "yousk2"],
          code: "h5cr2h",
          commentaireFin: " Definition : <br/> Première partie d'un discours.<br/> Exorde d'une harangue, d'un plaidoyer. ", image: null
        },
        //Enigme 3
        {
          title: "Rébus", description: "Quel est ce mot ?  ", day: 1, numStand: 340, reponse: ["ANECDOTE", "yousk2", "anecdote", "Anecdote"],
          code: "4gla2x", commentaireFin: "Anecdote (âne-haie-k'-Do-t) : Bref récit d'un fait curieux ou pittoresque, susceptible de divertir : une histoire. ", image: "assets/img/imgEnigmes/rebusAne.png"
        },
        //Enigme 4
        {
          title: "Dingbat", description: "Quelle est cette expression ? ",
          day: 1, numStand: 426, reponse: ["PLUS DE PEUR QUE DE MAL", "yousk2", "plus de peur que de mal",  "Plus de peur que de mal"],
          code: "yf8t2d", commentaireFin: "Plus de peur que de mal", image: "assets/img/imgEnigmes/peurMal.png"
        },
        //Enigme 5
        {
          title: "Salée...", description: "Cette pierre tendre de feuilletée,<br/>En Bretagne, est très employée.<br/>Les écoliers l'ont tous levée.<br/>Et parfois, elle est très salée.<br/>Qui est-elle ?<br/>",
          day: 1, numStand: 500, reponse: ["ARDOISE", "ardoise", "l'ardoise", "Ardoise", "l'Ardoise", "L'ardoise", "L'Ardoise", "L'ARDOISE", "l'ARDOISE", "yousk2"],
          code: "nhe8wz",
          commentaireFin: "L’ardoise est une roche métamorphique qui s'est formée dans de fortes conditions de pression et de température. Elle est très utilisées pour les toits des maisons Bretonnes", image: null
        },
        //Enigme 6
        {
          title: "Charade typographique", description: "Mon premier vient après R<br/>Mon deuxième est l’un de nos parents<br/>Mon troisième est l’état d’un livre lorsqu’on l’a fini<br/>Mon quatrième est un suffixe diminutif féminin<br/>Mon tout est un caractère typographique<br/>",
          day: 1, numStand: 416, reponse: ["ESPERLUETTE", "Esperluette", "esperluette", "L'esperluette", "L'Esperluette", "L'ESPERLUETTE", "l'ESPERLUETTE", "L'ESPERLUETTE", "l'esperluette", "l'Esperluette", "yousk2"],
          code: "f7ezf5",
          commentaireFin: "L’esperluette (S-pere-lu-ette) est le caractère qui représente le « et » : & ", image: null
        },
        //Enigme 7
        {
          title: "Un peu de calcul", description: "S _ _ A _ _ _ Q  _ _ <br/>  +<br/>  _ _ M_ _ _ I _ _ _ <br/>  +<br/>  _ É _ _ N _ _ _ U _  <br/>  +<br/>  _ _ _ _ _ T _ _ _ E ", day: 1, numStand: 320,
          reponse: ["SEMANTIQUE", "sémantique", "Sémantique",  "Semantique", "semantique", "SÉMANTIQUE", "yousk2"],
          code: "kf8s3y", commentaireFin: "Sémantique : Étude du sens des unités linguistiques et de leurs combinaisons.", image: null
        },
        //Enigme 8
        {
          title: "Mystère final", description: "Je suis un mystère de la critique,<br/>Je suis un pilier du poulpe,<br/>Le roman noir est l’avenir du roman,<br/>Je suis un spécialiste de la littérature américaine,<br/>Je suis au salon du livre de Colmar<br/><br/>Qui suis-je ?",
          day: 1, numStand: 235, reponse: [ "PATRICK RAYNAL", "Patrick Raynal", "yousk2", "partick raynal", "Patrick raynal", "patrick Raynal", "raynal", "RAYNAL", "Raynal"],
          code: "4frt8d", commentaireFin: "Patrick Raynal, né le 1er juillet 1946 à Paris, est écrivain, éditeur, scénariste, traducteur et journaliste français. Considéré comme un spécialiste de la littérature américaine, il collabore, de 1990 à 1995, au journal Le Monde (Le Monde des Livres). La même année, il obtient le prix Mystère de la critique pour son roman Fenêtre sur femmes.", image: null
        },
      ]
    }
    else {
      if (this.laDate == "25") {
        console.log(this.lesEnigmes);
        this.lesEnigmes = [

          //Jour 2 
          //Enigme 1
          {
            title: "", description: "Modeste employé de bureau,<br/>Notant jadis sur ses tablettes,<br/>Pouvant porter une palette,<br/>Et qui déchiffre les rouleaux.<br/><br/>Qui est-il ?",
            day: 2, numStand: 100, reponse: ["LE SCRIBE","scribe", "yousk2", "le scribe", "le Scribe", "Le scribe", "Le Scribe",  "SCRIBE"],
            code: "md7at1", commentaireFin: "En Égypte ancienne, personnage important d'une administration chargé de la rédaction de divers textes.<br/>Dans les écrits du Nouveau Testament, docteur juif, interprète officiel des saintes Écritures.", image: null
          },
          //Enigme 2
          {
            title: "AVOCAT", description: "Déchiffrez le code : <br/>LKMRS-LYEJYEU",
            day: 2, numStand: 201, reponse: ["BACHI-BOUZOUK", "yousk2",  "bachi-bouzouk", "Bachi-bouzouk", "Bachi-Bouzouk", "BACHI BOUZOUK", "bachi bouzouk", "Bachi bouzouk", "Bachi Bouzouk"],
            code: "h5cr2h", commentaireFin: "Bachi-Bouzouk : cavalier mercenaire de l'armée de l'Empire ottoman, souvent d'origine albanaise. Les bachi-bouzouk participèrent notamment au siège de Vienne.", image: null
          },
          //Enigme 3
          {
            title: "Rébus", description: "Quel est ce mot ?",
            day: 2, numStand: 340, reponse: ["ENCYCLOPEDISTE", "L'ENCYCLOPEDISTE", "L'ENCYCLOPÉDISTE", "yousk2", "encyclopediste", "Encyclopediste", "Encyclopédiste", "encyclopédiste", "ENCYCLOPÉDISTE", "l'ecyclopediste", "l'encyclopédiste", "l'Ecyclopediste", "l'Encyclopédiste", "L'ecyclopediste", "L'encyclopédiste", "L'Ecyclopediste", "L'Encyclopédiste"],
            code: "4gla2x", commentaireFin: "Définition : <br/>Auteur ou collaborateur d'une encyclopédie.", image: "assets/img/imgEnigmes/rebusOeufs.png"
          },
          //Enigme 4
          {
            title: "Dingbat", description: "Quel est cet adjectif ? ",
            day: 2, numStand: 426, reponse: ["IRREVERSIBLE", "Irréversible", "yousk2", "irréversible", "irreversible", "Irreversible", "IRRÉVERSIBLE"],
            code: "yf8t2d", commentaireFin: "Irréversible ( i ré vert si bleu) : Qui suit un processus qu'on ne peut ni enrayer ni renverser : Mouvement, maladie irréversible.", image: "assets/img/imgEnigmes/iresi.png"
          },
          //Enigme 5
          {
            title: "Un fait impromptu", description: "Cet imprévisible évènement,<br/>Qu'on appelle aussi aléa.<br/>Apporte des bouleversements,<br/>Surtout quand on ne l'attend pas.<br/><br/>Qui est-il ?",
            day: 2, numStand: 500, reponse: ["HASARD","yousk2", "Hasard",  "hasard", "le hasard", "le Hasard", "Le hasard", "Le Hasard", "LE HASARD"],
            code: "nhe8wz", commentaireFin: "Puissance considérée comme la cause d'événements apparemment fortuits ou inexplicables : Rien n'a été laissé au hasard.", image: null
          },
          //Enigme 6
          {
            title: "Charade atténuée", description: "Mon premier est la 5éme lettre de l’alphabet<br/>Mon deuxième est l’alliée de Peter Pan<br/>Mon troisième est élue dans un concours de beauté<br/>Mon quatrième est un pronom personnel<br/><br/>Mon tout est une figure de style",
            day: 2, numStand: 416, reponse: ["EUPHEMISME", "yousk2", "euphemisme", "Euphemisme", "Euphémisme", "euphémisme", "l'euphemisme", "L'euphemisme", "l'Euphemisme", "L'Euphemisme", "l'euphémisme", "L'euphémisme", "l'Euphémisme", "L'Euphémisme", "L'EUPHEMISME",  "L'EUPHÉMISME", "EUPHÉMISME"],
            code: "f7ezf5", commentaireFin: "Euphémisme (E-fée-miss-me). Elle permet de rendre une réalité moins brutale.", image: null
          },
          //Enigme 7
          {
            title: "Un peu de clacul...", description: "_ _ U _ _ _ E _ _<br/>  +<br/>T _ _ C _ _ _ N _<br/>  +<br/> _ R _ _ U _ _ _ _<br/>  +<br/>_ _ _ _ _ L _ _ T ",
            day: 2, numStand: 320, reponse: ["TRUCULENT", "yousk2", "truculent",  "Truculent"],
            code: "kf8s3y", commentaireFin: "Truculent adj. :  On qualifie ainsi un style qui n'hésite pas à employer des mots crus, grossiers, ou des mots violents.", image: null
          },
          //Enigme 8
          {
            title: "Mystère final", description: "Je suis un poète français maudit,<br/>Ayant un époux infernal,<br/>J’écris des recueils.<br/><br/>Qui suis-je ?",
            day: 2, numStand: 235, reponse: ["PAUL VERLAINE", "yousk2", "Paul VERLAINE",  "Paul Verlaine", "paul verlaine", "Paul verlaine", "paul Verlaine", "verlaine", "Verlaine", "VERLAINE"],
            code: "4frt8d", commentaireFin: " Paul Verlaine est un poète français né à Metz le 30 mars 1844, il est décédé à Paris le 8 janvier 1896. Il abandonne sa femme pour suivre Rimbaud en Angleterre et en Belgique. Mais les relations entre ces deux hommes trop différents sont orageuses : En 1873 Verlaine blesse Rimbaud avec un révolver et sera condamné à deux ans de prison. Il se convertit au catholicisme pendant sa détention, et il écrit plusieurs poèmes de Sagesse.", image: null
          }
        ];
      }
    }

    // Numéro de l'énigme 
    this.index = 0;
    // Nombre de bonnes réponses 
    this.compteurReponse = 0;
    // Test code de l'énigme juste
    this.codeBon = false;
    // Test code de l'énigme faux
    this.erreurCode = false;
    // Test réponse fausse
    this.erreurRep = false;
    // Test réponse juste
    this.reponseBonne = false;
    // Test validation + affichage de l'énigme suivante
    this.reponseValidee = false;
    // Test reponse à valider pour passer à l'énigme suivante
    this.repAValider = false;
    // Test affichage de l'énigme
    this.afficherIntitulé = false;
    // Test d'affichage de l'image
    this.afficherImage = false;

    // Test Message de fin
    this.messageFin = false;


    this.todo = this.lesEnigmes[this.index];
  }



  onClickCode() {
    if (this.todo.code == this.codeEnigme) {
      this.codeBon = true;
      this.erreurCode = false;
      this.repAValider = true;
    }
    else {
      this.erreurCode = true;
    }

    if (this.compteurReponse == 2 || this.compteurReponse == 3) {
      this.afficherImage = true;
    }
    console.log(this.laDate);
  }

  onClickEnigme() {
    this.todo.reponse.forEach(rep => {
      if ((rep == this.reponseDonnee || this.reponseBonne)) {
        this.erreurRep = false;
        this.codeBon = true;
        this.reponseBonne = true;
        this.codeEnigme = "";
        this.repAValider = false;
      }
      else {
        this.erreurRep = true;
      }

      if (this.compteurReponse == 2 || this.compteurReponse == 3) {
        this.afficherImage = true;
      }
    });
  }

  onClickValideEnigme() {
    this.reponseBonne = false;
    this.reponseDonnee = "";
    this.compteurReponse++;
    this.index++;
    this.todo = this.lesEnigmes[this.index];
    this.codeBon = false;
    this.afficherImage = false;

    if (this.compteurReponse == 8) {
      this.messageFin = true;
      this.index = 0;
      this.compteurReponse = 0;
      this.codeBon = true;
      this.erreurCode = false;
      this.erreurRep = false;
      this.reponseBonne = false;
      this.reponseValidee = false;
      this.repAValider = false;
      this.afficherIntitulé = false;
      this.afficherImage = false;
    }
  }

}
