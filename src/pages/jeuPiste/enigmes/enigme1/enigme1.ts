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
        day: 1, numStand: 201, reponse: ["EXORDE", "exorde", "éxorde", "l'exorde", "L'exorde", "l'éxorde", "L'éxorde", "l'Éxorde", "L'Éxorde", "L'ÉXORDE", "yousk2"],
         code: "h5cr2h",
        commentaireFin: " Definition : <br/> Première partie d'un discours.<br/> Exorde d'une harangue, d'un plaidoyer. ", image: null
      },
      //Enigme 3
      { title: "Rébus", description: "Quel est ce mot ?  ", day: 1, numStand: 340, reponse: ["ANECDOTE", "yousk2", "anecdote", "Anecdote"], 
      code: "4gla2x", commentaireFin: "Anecdote (âne-haie-k'-Do-t) : Bref récit d'un fait curieux ou pittoresque, susceptible de divertir ; histoire. ", image: "assets/img/imgEnigmes/rebusAne.png" },
      //Enigme 4
      { title: "Dingbat", description: "Quelle est cette expression ? ", 
      day: 1, numStand: 426, reponse: [ "yousk2"," "], 
      code: "yf8t2d", commentaireFin: " ", image: "assets/img/imgEnigmes/peurMal.png" },
      //Enigme 5
      {
        title: "Salée...", description: "Cette pierre tendre de feuilletée,<br/>En Bretagne, est très employée.<br/>Les écoliers l'ont tous levée.<br/>Et parfois, elle est très salée.<br/>Qui est-elle ?<br/>",
        day: 1, numStand: 500, reponse: ["ardoise", "l'ardoise", "Ardoise", "l'Ardoise", "L'ardoise", "ARDOISE", "L'Ardoise", "L'ARDOISE", "l'ARDOISE", "yousk2"], 
        code: "nhe8wz",
        commentaireFin: "L’ardoise est une roche métamorphique qui s'est formée dans de fortes conditions de pression et de température. Elle est très utilisées pour les toits des maisons Bretonnes", image: null
      },
      //Enigme 6
      {
        title: "Charade", description: "Mon premier vient après R<br/>Mon deuxième est l’un de nos parents<br/>Mon troisième est l’état d’un livre lorsqu’on l’a fini<br/>Mon quatrième est un suffixe diminutif féminin<br/>Mon tout est un caractère typographique<br/>",
        day: 1, numStand: 416, reponse: ["Esperluette", "esperluette", "L'esperluette", "L'Esperluette", "ESPERLUETTE", "L'ESPERLUETTE", "l'ESPERLUETTE", "L'ESPERLUETTE", "l'esperluette", "l'Esperluette", "yousk2"], 
        code: "f7ezf5",
        commentaireFin: "L’esperluette (S-pere-lu-ette) est le caractère qui représente le « et » : & ", image: null
      },
      //Enigme 7
      {
        title: "Un peu de calcul", description: "S _ _ A _ _ _ Q  _ _ <br/> +<br/>  _ _ M_ _ _ I _ _ _ <br/> +<br/>  _ É _ _ N _ _ _ U _  <br/>+<br/>  _ _ _ _ _ T _ _ _ E ", day: 1, numStand: 320,
        reponse: ["sémantique", "Sémantique", "SEMANTIQUE", "Semantique", "semantique", "SÉMANTIQUE", "yousk2"],
         code: "kf8s3y", commentaireFin: "Sémantique : Étude du sens des unités linguistiques et de leurs combinaisons.", image: null
      },
      //Enigme 8
      { title: "Mystère final", description: "Je suis un mystère de la critique,<br/>Je suis un pilier du poulpe,<br/>Le roman noir est l’avenir du roman,<br/>Je suis un spécialiste de la littérature américaine,<br/>Je suis au salon du livre de Colmar<br/><br/>Qui suis-je ?",
       day: 1, numStand: 235, reponse: ["Patrick Raynal", "yousk2", "partick raynal", "Partick raynal", "patrick Raynal", "raynal", "RAYNAL", "PARTICK RAYNAL", "Raynal"],
        code: "4frt8d", commentaireFin: "Mystère de la critique fait référence au prix du mystère de la critique qu’il a gagné en 1989. « Le roman noir est l’avenir du roman » est une de ses citations, ça donne un indice de la catégorie de ses écrits. ", image: null },


      //Jour 2 
      //Enigme 1
      { title: "Dans la vigie...", description: "Modeste employé de bureau,<br/>Notant jadis sur ses tablettes,<br/>Pouvant porter une palette,<br/>Et qui déchiffre les rouleaux.<br/><br/>Qui est-il ?",
       day: 2, numStand: 100, reponse: ["scribe", "yousk2", "le scribe", "le Scribe", "Le scribe", "Le Scribe", "LE SCRIBE", "SCRIBE"],
        code: "md7at1", commentaireFin: "En Égypte ancienne, personnage important d'une administration chargé de la rédaction de divers textes.<br/>Dans les écrits du Nouveau Testament, docteur juif, interprète officiel des saintes Écritures.", image: null },
      //Enigme 2
      { title: "AVOCAT", description: "Déchiffrez le code : <br/>LKMRS-LYEJYEU", 
      day: 2, numStand: 201, reponse: ["yousk2", "BACHI-BOUZOUK", "bachi-bouzouk", "Bachi-bouzouk", "Bachi-Bouzouk", "BACHI BOUZOUK", "bachi bouzouk", "Bachi bouzouk", "Bachi Bouzouk" ], 
      code: "h5cr2h", commentaireFin: "Bachi-Bouzouk : cavalier mercenaire de l'armée de l'Empire ottoman, souvent d'origine albanaise. Les bachi-bouzouk participèrent notamment au siège de Vienne.", image: null },
      //Enigme 3
      { title: "Rébus", description: "Quel est ce mot ?", 
      day: 2, numStand: 340, reponse: ["ENCYCLOPEDISTE", "L'ENCYCLOPEDISTE","L'ENCYCLOPÉDISTE", "yousk2", "encyclopediste", "Encyclopediste", "Encyclopédiste", "encyclopédiste", "ENCYCLOPÉDISTE", "l'ecyclopediste", "l'encyclopédiste", "l'Ecyclopediste", "l'Encyclopédiste", "L'ecyclopediste", "L'encyclopédiste", "L'Ecyclopediste", "L'Encyclopédiste"],
      code: "4gla2x", commentaireFin: " ", image: "assets/img/imgEnigmes/rebusOeufs.png" },
      //Enigme 4
      { title: "Dingbat", description: "Quel est cet adjectif ? ", 
      day: 2, numStand: 426, reponse: ["Irréversible", "yousk2"], 
      code: "yf8t2d", commentaireFin: " ", image: "assets/img/imgEnigmes/iresi.png" },
      //Enigme 5
      { title: "coucou", description: "ldjfldj", 
      day: 2, numStand: 500, reponse: [" ", "yousk2"], 
      code: "nhe8wz", commentaireFin: " ", image: null },
      //Enigme 6
      { title: "coucou", description: "ldjfldj", 
      day: 2, numStand: 416, reponse: [" ", "yousk2"], 
      code: "f7ezf5", commentaireFin: " ", image: null },
      //Enigme 7
      { title: "coucou", description: "ldjfldj", 
      day: 2, numStand: 320, reponse: [" ", "yousk2"], 
      code: "kf8s3y", commentaireFin: " ", image: null },
      //Enigme 8
      { title: "coucou", description: "ldjfldj", 
      day: 2, numStand: 235, reponse: [" ", "yousk2"], 
      code: "4frt8d", commentaireFin: " ", image: null }
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
