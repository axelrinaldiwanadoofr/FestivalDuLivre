import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-jeuPiste',
  templateUrl: 'enigme1.html'
})
export class Enigme1 {

  public lesEnigmes: Array<{ title: string, description: string, day: number, numStand: number, reponse: Array<string>, code: string[6], commentaireFin: string }>;

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

  public codeEnigme: string;
  public reponseDonnee: string;


  constructor(public navCtrl: NavController) {
    this.lesEnigmes = [
      //Jour 1 
      //Enigme 1
      {
        title: "Il était une fois...", description:
          "Toujours le premier, <br/> Jamais le dernier.<br/> Rien sans lui n'est jamais fini, <br/> Car rien ne peut commencer sans lui.<br/><br/>  Qui est-il ?",
        day: 1, numStand: 100, reponse: ["début", "debut", "le début", "le debut", "DEBUT", "LE DEBUT", "Le Debut", "Le Début", "le Début", "le Debut, Le début"], 
        code: "md7at1", commentaireFin: "Le début amorce l'histoire et ne permet pas de finir quoi que ce soit s'il n'est pas présent. "
      },
      //Enigme 2
      { title: "AVOCAT", description: 
          "Déchiffrez le code : <br/>OHYBNO",
           day: 1, numStand: 201, reponse: ["EXORDE", "exorde", "éxorde", "l'exorde", "L'exorde", "l'éxorde", "L'éxorde"], code: "h5cr2h",
            commentaireFin: " Definition : <br/> Première partie d'un discours.<br/> Exorde d'une harangue, d'un plaidoyer. " },
      //Enigme 3
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 340, reponse: [" "], code: "4gla2x", commentaireFin: " " },
      //Enigme 4
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 426, reponse: [" "], code: "yf8t2d", commentaireFin: " " },
      //Enigme 5
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 500, reponse: [" "], code: "nhe8wz", commentaireFin: " " },
      //Enigme 6
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 416, reponse: [" "], code: "f7ezf5", commentaireFin: " " },
      //Enigme 7
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 320, reponse: [" "], code: "kf8s3y", commentaireFin: " " },
      //Enigme 8
      { title: "coucou", description: "ldjfldj", day: 1, numStand: 235, reponse: [" "], code: "4frt8d", commentaireFin: " " },


      //Jour 2 
      //Enigme 1
      { title: "Dans la vigie...", description: "ldjfldj", day: 2, numStand: 100, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 2
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 201, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 3
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 340, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 4
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 426, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 5
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 500, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 6
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 416, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 7
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 320, reponse: [" "], code: "", commentaireFin: " " },
      //Enigme 8
      { title: "coucou", description: "ldjfldj", day: 2, numStand: 235, reponse: [" "], code: "", commentaireFin: " " }
    ];

    this.index = 0;
    this.compteurReponse = 0;
    this.codeBon = false;
    this.erreurCode = false;
    this.erreurRep = false;
    this.reponseBonne = false;
    this.reponseValidee = false;
    this.repAValider = false;
    this.afficherIntitulé = false;


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
    });
  }

  onClickValideEnigme() {
    this.reponseBonne = false;
    this.reponseDonnee = "";
    this.compteurReponse ++;
    this.index ++;
    this.todo = this.lesEnigmes[this.index];
    this.codeBon = false;
  }
}
