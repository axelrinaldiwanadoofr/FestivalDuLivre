import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { InfoPage } from '../pages/info/info';
import { ContactPage } from '../pages/contact/contact';
import { PresentationPage } from '../pages/presentation/presentation';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FavorisPage } from '../pages/favoris/favoris' ;
import { TelechargerPage} from '../pages/telecharger/telecharger';
import { lyceePage } from '../pages/lycee/lycee';
import { jeuPistePage } from '../pages/jeuPiste/jeuPiste';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,

  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      
      { title: 'Accueil', component: HelloIonicPage, icon: 'home'},
      { title: "Présentation", component: PresentationPage, icon: 'desktop'},
      { title: "Infos pratiques", component: InfoPage, icon: 'information-circle'},
      { title: 'Restaurants', component: RestaurantsPage, icon: 'restaurant'},
      { title: "Contact", component: ContactPage, icon: 'contacts'},
      { title: "Favoris", component: FavorisPage, icon: 'star'},
      { title: "Téléchargement", component : TelechargerPage, icon :'md-download'},
      { title: "Lycée Camille Sée", component : lyceePage, icon: "ios-school"},
      { title: "Jeu de piste", component : jeuPistePage, icon: "md-map"}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


}
