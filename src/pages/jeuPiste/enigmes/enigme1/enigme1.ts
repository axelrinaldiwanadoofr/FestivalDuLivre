import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-jeuPiste',
  templateUrl: 'enigme1.html'
})
export class Enigme1 {

  public lesEnigmes: Array<{title: string, description: string}> ;

  public todo: any ;
  public index: number ;

  constructor(public navCtrl: NavController) {
    this.lesEnigmes = [
      { title: "coucou", description: "ldjfldj"}, 
      { title: "coucou2", description: "ldjfldj"}, 
      { title: "coucou3", description: "ldjfldj"}
    ] ;

    this.index = 0 ;

    this.todo = this.lesEnigmes[this.index] ;
  }

  onClickEnigme()
  {
    this.index++ ;
    this.todo = this.lesEnigmes[this.index] ;
  }
}
