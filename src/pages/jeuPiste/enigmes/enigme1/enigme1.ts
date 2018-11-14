import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-jeuPiste',
  templateUrl: 'enigme1.html'
})
export class Enigme1 {

  public lesEnigmes: Array<{title: string, description: string, day: number, numStand: number, reponse: Array<string>, code: string[6]}> ;

  public compteurReponse: number;
  public todo: any ;
  public index: number ;
  public codeBon: boolean;

  constructor(public navCtrl: NavController) {
    this.lesEnigmes = [
      //Jour 1 
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 100, reponse: [" "], code: "md7at1"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 201, reponse: [" "], code: "h5cr2h"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 340, reponse: [" "], code: "4gla2x"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 426, reponse: [" "], code: "yf8t2d"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 500, reponse: [" "], code: "nhe8wz"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 416, reponse: [" "], code: "f7ezf5"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 320, reponse: [" "], code: "kf8s3y"},
      { title: "coucou", description: "ldjfldj", day : 1, numStand: 235, reponse: [" "], code: "4frt8d"},
      //Jour 2 
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 100, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 201, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 340, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 426, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 500, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 416, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 320, reponse: [" "], code: ""},
      { title: "coucou", description: "ldjfldj", day : 2, numStand: 235, reponse: [" "], code: ""}
    ] ;

    this.index = 0 ;
    this.codeBon = false;

    this.todo = this.lesEnigmes[this.index] ;
  }

  onClickEnigme()
  {
      this.todo.reponse.forEach(rep => {
        if (rep == document.getElementById('reponseEnigme').textContent)
        {
            this.codeBon = false;
            this.index ++;
        }
      });
  }

  onClickCode()
  {
    if (this.todo.code == document.getElementById('codeEnigme').textContent)
    {
      this.codeBon == true;
    }
  }
}
