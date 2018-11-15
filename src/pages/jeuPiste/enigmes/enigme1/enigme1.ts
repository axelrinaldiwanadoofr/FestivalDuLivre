import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  public codeEnigme: string;
  public reponseDonnee: string;


  constructor(public navCtrl: NavController) {
    this.lesEnigmes = [
      //Jour 1 
      //Enigme 1
      {
        title: "Il était une fois...", description:
        "Toujours le premier, <br/> Jamais le dernier.<br/> Rien sans lui n'est jamais fini, <br/> Car rien ne peut commencer sans lui.<br/><br/>  Qui est-il ?",
        day: 1, numStand: 100, reponse: ["début", "debut", "le début", "le debut", "DEBUT", "LE DEBUT", "Le Debut", "Le Début", "le Début", "le Debut", "Le début", "LE DÉBUT", "le DÉBUT", "Le DÉBUT", "le DEBUT", "Le DEBUT", "yousk2"],
        code: "md7at1", commentaireFin: "Le début amorce l'histoire et ne permet pas de finir quoi que ce soit s'il n'est pas présent. ",
        image: null
      },
      //Enigme 2
      {
        title: "AVOCAT", description:
        "Déchiffrez le code : <br/>OHYBNO",
        day: 1, numStand: 201, reponse: ["EXORDE", "exorde", "éxorde", "l'exorde", "L'exorde", "l'éxorde", "L'éxorde", "l'Éxorde", "L'Éxorde", "L'ÉXORDE", "yousk2"], code: "h5cr2h",
        commentaireFin: " Definition : <br/> Première partie d'un discours.<br/> Exorde d'une harangue, d'un plaidoyer. ", image: null
      },
      //Enigme 3
      { title: "REBUS", description: "oui", day: 1, numStand: 340, reponse: ["ANECDOTE", "yousk2", "anecdote", "Anecdote"], code: "4gla2x", commentaireFin: " ", image: "assets/img/imgEnigmes/rebusAne.png" },
      //Enigme 4
      { title: "DINGBAT", description: "non", day: 1, numStand: 426, reponse: [" ", "yousk2"], code: "yf8t2d", commentaireFin: " ", image: "assets/img/imgEnigmes/peurMal.png" },
      //Enigme 5
      {
        title: "Salée...", description: "Cette pierre tendre de feuilletée,<br/>En Bretagne, est très employée.<br/>Les écoliers l'ont tous levée.<br/>Et parfois, elle est très salée.<br/>Qui est-elle ?<br/>",
        day: 1, numStand: 500, reponse: ["ardoise", "l'ardoise", "Ardoise", "l'Ardoise", "L'ardoise", "ARDOISE", "L'Ardoise", "L'ARDOISE", "l'ARDOISE", "yousk2"], code: "nhe8wz",
        commentaireFin: "L’ardoise est une roche métamorphique qui s'est formée dans de fortes conditions de pression et de température. Elle est très utilisées pour les toits des maisons Bretonnes", image: null
      },
      //Enigme 6
      {
        title: "Charade", description: "Mon premier vient après R<br/>Mon deuxième est l’un de nos parents<br/>Mon troisième est l’état d’un livre lorsqu’on l’a fini<br/>Mon quatrième est un suffixe diminutif féminin<br/>Mon tout est un caractère typographique<br/>",
        day: 1, numStand: 416, reponse: ["Esperluette", "esperluette", "L'esperluette", "L'Esperluette", "ESPERLUETTE", "L'ESPERLUETTE", "l'ESPERLUETTE", "L'ESPERLUETTE", "l'esperluette", "l'Esperluette", "yousk2"], code: "f7ezf5",
        commentaireFin: "L’esperluette (S-pere-lu-ette) est le caractère qui représente le « et » : & ", image: null
      },
      //Enigme 7
      {
        title: "Un peu de calcul", description: "S _ _ A _ _ _ Q  _ _ <br/> +<br/>  _ _ M_ _ _ I _ _ _ <br/> +<br/>  _ É _ _ N _ _ _ U _  <br/>+<br/>  _ _ _ _ _ T _ _ _ E ", day: 1, numStand: 320,
        reponse: ["sémantique", "Sémantique", "SEMANTIQUE", "Semantique", "semantique", "SÉMANTIQUE", "yousk2"], code: "kf8s3y", commentaireFin: " ", image: null
      },
      //Enigme 8
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 235, reponse: [" ", "yousk2"], code: "4frt8d", commentaireFin: " ", image: null },


      //Jour 2 
      //Enigme 1
      { title: "Dans la vigie...", description: "ldjfldj", day: 2, numStand: 100, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null },
      //Enigme 2
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 201, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null },
      //Enigme 3
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 340, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: "assets/img/imgEnigmes/rebusOeufs.png" },
      //Enigme 4
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 426, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: "assets/img/imgEnigmes/iresi.png" },
      //Enigme 5
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 500, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null },
      //Enigme 6
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 416, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null },
      //Enigme 7
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 320, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null },
      //Enigme 8
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 235, reponse: [" ", "yousk2"], code: "", commentaireFin: " ", image: null }
    ];

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
