import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-jeuPiste',
  templateUrl: 'enigme1.html'
})
export class Enigme1 {

  public lesEnigmes: Array<{title: string, description: string, day: number, numStand: number, reponse: Array<string>}> ;

  public compteurReponse: number;
  public todo: any ;
  public index: number ;

  // Déclaration des codes des énigmes 
  private CODEENIGME1 : any = "md7at1" ;
  private CODEENIGME2 : any = "h5cr2h" ;
  private CODEENIGME3 : any = "4gla2x" ;
  private CODEENIGME4 : any = "yf8t2d" ;
  private CODEENIGME5 : any = "nhe8wz" ;
  private CODEENIGME6 : any = "f7ezf5" ;
  private CODEENIGME7 : any = "kf8s3y" ;
  private CODEENIGME8 : any = "4frt8d" ;

  constructor(public navCtrl: NavController) {
    this.lesEnigmes = [
      //Jour 1 
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 100, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 201, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 340, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 426, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 500, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 416, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 320, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 235, reponse: [" "]},
      //Jour 2 
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 100, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 201, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 340, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 426, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 500, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 416, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 320, reponse: [" "]},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 235, reponse: [" "]}
    ] ;

    this.index = 0 ;

    this.todo = this.lesEnigmes[this.index] ;
  }

  onClickEnigme()
  {
      
  }
}
