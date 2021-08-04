import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/loginFolder/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NavbarComponent } from './features/dashboard/navbar/navbar.component';
import { HeaderComponent } from './features/dashboard/header/header.component';
import { AccueilComponent } from './features/dashboard/accueil/accueil.component';
import { ApprovisionnementComponent } from './features/dashboard/approvisionnement/approvisionnement.component';
import { VenteComponent } from './features/dashboard/vente/vente.component';
import { UtilisateurComponent } from './features/dashboard/utilisateur/utilisateur.component';
import { FournisseurComponent } from './features/dashboard/fournisseur/fournisseur.component';
import { ClientComponent } from './features/dashboard/client/client.component';
import { CategorieComponent } from './features/dashboard/categorie/categorie.component';
import { ProduitComponent } from './features/dashboard/produit/produit.component';
import { CommandeClientComponent } from './features/dashboard/commande-client/commande-client.component';
import { CommandeFournisseurComponent } from './features/dashboard/commande-fournisseur/commande-fournisseur.component';
import { GestionnaireComponent } from './features/dashboard/gestionnaire/gestionnaire.component';
import { VendeurComponent } from './features/dashboard/vendeur/vendeur.component';
import { AdministrateurComponent } from './features/dashboard/administrateur/administrateur.component';
import { CreatePasswordComponent } from './features/loginFolder/create-password/create-password.component';
import { ResetPasswordComponent } from './features/loginFolder/reset-password/reset-password.component';
import { DatefilterPipe } from './shared/pipes/datefilter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    AccueilComponent,
    ApprovisionnementComponent,
    VenteComponent,
    UtilisateurComponent,
    FournisseurComponent,
    ClientComponent,
    CategorieComponent,
    ProduitComponent,
    CommandeClientComponent,
    CommandeFournisseurComponent,
    GestionnaireComponent,
    VendeurComponent,
    AdministrateurComponent,
    CreatePasswordComponent,
    ResetPasswordComponent,
    DatefilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
