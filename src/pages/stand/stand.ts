import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { StandListExposantPage} from '../stand-list-exposant/stand-list-exposant' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the StandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-stand',
	templateUrl: 'stand.html',
})
export class StandPage {

	selectedItem:any;
	public stands:Array<{id:string}>;
	public stands2:Array<{id:string}>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd:RemoteSqlProvider) {
		this.stands=[];
		this.selectedItem=navParams.get('item');
		this.sqlPrd.select(
			"SELECT * FROM stand_18 WHERE id >= " + this.selectedItem.numMin + " AND id < " + this.selectedItem.numMax,
			null,
			this.stands
		);
		this.stands2=this.stands;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StandPage');
	}
 
	event(stand){
		this.navCtrl.push(StandListExposantPage,{numStand:stand.id});
	}
	getItems(ev: any) {
		// Reset items back to all of the items
		this.stands=this.stands2

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.stands = this.stands.filter((stand) => {
				return (stand.id.indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	Accueil(){
		this.navCtrl.setRoot(HelloIonicPage);
	}
}
