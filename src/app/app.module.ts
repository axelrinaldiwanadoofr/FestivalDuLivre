import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PlanComponent } from '../components/plan/plan' ;
import { ListeFrmSqlModeleComponent } from '../components/liste-frm-sql-modele/liste-frm-sql-modele' ;
import { ListeFrmLineComponent } from '../components/liste-frm-line/liste-frm-line' ;
import { TabFormComponent } from '../components/tab-form/tab-form' ;
import { TabRowComponent } from '../components/tab-row/tab-row' ;
import { TabCellComponent } from '../components/tab-cell/tab-cell' ;
import { TabBtSaveComponent } from '../components/tab-bt-save/tab-bt-save' ;
import { TabBtCancelComponent } from '../components/tab-bt-cancel/tab-bt-cancel' ;
import { TabBtRemoveComponent } from '../components/tab-bt-remove/tab-bt-remove' ;
import { TabBtNewComponent } from '../components/tab-bt-new/tab-bt-new' ;
import { TabColHeaderComponent } from '../components/tab-col-header/tab-col-header' ;
import { TabLineSelectorComponent } from '../components/tab-line-selector/tab-line-selector' ;
import { FileSelectorComponent } from '../components/file-selector/file-selector' ;
import { TextAreaComponent } from '../components/text-area/text-area' ;


import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ModeEmploiPage } from '../pages/mode-emploi/mode-emploi';
import { InfoPage } from '../pages/info/info';
import { ItinérairePage } from '../pages/itinéraire/itinéraire';
import { PlanAccesPage } from '../pages/plan-acces/plan-acces';
import { ContactPage } from '../pages/contact/contact';
import { DatesPage } from '../pages/dates/dates';
import { HistoriquePage } from '../pages/historique/historique';
//import { ThemePage } from '../pages/theme/theme';
import { PlansPage} from '../pages/plans/plans';
import { RecherchePage } from '../pages/recherche/recherche';
import { ThemesPage } from '../pages/themes/themes';
import { ThemePage2 } from '../pages/themes/theme';
import { PresentationPage } from '../pages/presentation/presentation';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { RendezVousPage } from '../pages/rendez-vous/rendez-vous';
import { RendezVousDetailPage } from '../pages/rendez-vous/rendez-vous-detail';
import { HallsPage } from '../pages/halls/halls';
import { StandPage } from '../pages/stand/stand';
import { IntervenantPage } from '../pages/intervenant/intervenant';
import { PersonnePage } from '../pages/personne/personne';
import { RechercheThemePage } from '../pages/recherche-theme/recherche-theme';
import { StandListExposantPage } from '../pages/stand-list-exposant/stand-list-exposant' ;
import { RechercheRdvPage } from '../pages/recherche-rdv/recherche-rdv';
import { RechercheLivrePage } from '../pages/recherche-livre/recherche-livre';
import { RechercheExposantPlanPage } from '../pages/recherche-exposant-plan/recherche-exposant-plan' ;
import { LivrePage } from '../pages/livre/livre' ;
import { ExposantPage } from '../pages/exposant/exposant' ;
import { lyceePage } from '../pages/lycee/lycee' ;
import { jeuPistePage } from '../pages/jeuPiste/jeuPiste';
import { ThemeExposantsPage } from '../pages/theme-exposants/theme-exposants' ;
import { UnePersonnePage } from '../pages/unepersonne/unepersonne' ;
import { FrmListeRdvPage } from '../pages/frm-liste-rdv/frm-liste-rdv' ;
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http' ;
import { RemoteSqlProvider } from '../providers/remotesql/remotesql' ;
import { JetonDeConnectionProvider } from '../providers/jeton-de-connection/jeton-de-connection';
import { WebSqlProvider } from '../providers/websql/websql';
import { FavorisProvider } from '../providers/favoris/favoris';
import { FavorisPage } from '../pages/favoris/favoris' ;
import { UnRendezVousPage } from '../pages/un-rendez-vous/un-rendez-vous' ;

import { TelechargerPage} from '../pages/telecharger/telecharger';

// Enigmes : 
import { Enigme1 } from '../pages/jeuPiste/enigmes/enigme1/enigme1';

@NgModule({
  declarations: [
    MyApp,
    TabFormComponent,
    TabRowComponent,
    TabCellComponent,
    TabColHeaderComponent,
    TabBtSaveComponent,
    TabBtCancelComponent,
    TabBtRemoveComponent,
    TabBtNewComponent,
    TabLineSelectorComponent,
    FileSelectorComponent,
    TextAreaComponent,    
    HelloIonicPage,
    ModeEmploiPage,
    InfoPage,
    ItinérairePage,
    PlanAccesPage,
    ContactPage,
    DatesPage,
    FavorisPage,
    HistoriquePage,
    //ThemePage,
    PlansPage,
    RecherchePage,
    ThemesPage,
    ThemePage2,
    PresentationPage,
    RestaurantsPage,
    RendezVousPage,
    HallsPage,
    StandPage,
    PersonnePage,
    IntervenantPage,
    RechercheThemePage,
    RechercheRdvPage,
    PlanComponent,
    StandListExposantPage,
    RechercheLivrePage,
    RechercheExposantPlanPage,
    LivrePage,
    ExposantPage,
    RendezVousDetailPage,
    UnePersonnePage,
    ThemeExposantsPage,
    FrmListeRdvPage,
    lyceePage,
    jeuPistePage,
    UnRendezVousPage,
    TelechargerPage,
    Enigme1,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ModeEmploiPage,
    InfoPage,
    ItinérairePage,
    PlanAccesPage,
    ContactPage,
    DatesPage,
    HistoriquePage,
   // ThemePage,
    PlansPage,
    RecherchePage,
    ThemesPage,
    ThemePage2,
    PresentationPage,
    RestaurantsPage,
    RendezVousPage,
    HallsPage,
    StandPage,
    IntervenantPage,
    PersonnePage,
    RechercheThemePage,
    RechercheRdvPage,
    FavorisPage,
    StandListExposantPage,
    RechercheLivrePage,
    RechercheExposantPlanPage,
    RendezVousDetailPage,
    LivrePage,
    ExposantPage,
    UnePersonnePage,
    ThemeExposantsPage,
    FrmListeRdvPage,
    lyceePage,
    jeuPistePage,
    UnRendezVousPage,
    TelechargerPage,
    Enigme1,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteSqlProvider,
    JetonDeConnectionProvider,
    WebSqlProvider,
    FavorisProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  constructor()
  {
    // Specifie l'URL pour l'accès à la base de donnée 
    RemoteSqlProvider.setWebSqlApiUrl( "http://www.lcs.alsace/flc/php" ) ;
    //RemoteSqlProvider.setWebSqlApiUrl( "http://localhost/bd" ) ;
    
    // Specifie le nom de la base de donnée à consulter
    RemoteSqlProvider.setWebDbNameAndId( "lcsalsacggroot", 1 ) ;

    WebSqlProvider.setWebSql( "FLC", "1.0", "Festival du livre", 1000*1024, (prd)=>
    {
      prd.createTable( "favoris", {idStand: "text", idExposant: "text", nomExposant: "text"}) ;
    });
  }
}
