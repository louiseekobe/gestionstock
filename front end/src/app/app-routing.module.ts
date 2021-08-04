import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './features/dashboard/accueil/accueil.component';
import { AdministrateurComponent } from './features/dashboard/administrateur/administrateur.component';
import { ApprovisionnementComponent } from './features/dashboard/approvisionnement/approvisionnement.component';
import { CategorieComponent } from './features/dashboard/categorie/categorie.component';
import { ClientComponent } from './features/dashboard/client/client.component';
import { CommandeClientComponent } from './features/dashboard/commande-client/commande-client.component';
import { CommandeFournisseurComponent } from './features/dashboard/commande-fournisseur/commande-fournisseur.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FournisseurComponent } from './features/dashboard/fournisseur/fournisseur.component';
import { GestionnaireComponent } from './features/dashboard/gestionnaire/gestionnaire.component';
import { ProduitComponent } from './features/dashboard/produit/produit.component';
import { UtilisateurComponent } from './features/dashboard/utilisateur/utilisateur.component';
import { VendeurComponent } from './features/dashboard/vendeur/vendeur.component';
import { VenteComponent } from './features/dashboard/vente/vente.component';
import { CreatePasswordComponent } from './features/loginFolder/create-password/create-password.component';
import { LoginComponent } from './features/loginFolder/login/login.component';
import { ResetPasswordComponent } from './features/loginFolder/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'password',component:CreatePasswordComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'accueil', component:DashboardComponent,
    children:[
      {path:'general', component:AccueilComponent},
      {path:'approvisionnement', component:ApprovisionnementComponent},
      {path:'vente', component:VenteComponent},
      {path:'administrateur', component:AdministrateurComponent},
      {path:'gestionnaire', component:GestionnaireComponent},
      {path:'vendeur', component:VendeurComponent},
      {path:'utilisateurs', component:UtilisateurComponent},
      {path:'vente', component:VenteComponent},
      {path:'fournisseur', component:FournisseurComponent},
      {path:'client', component:ClientComponent},
      {path:'categorie', component:CategorieComponent},
      {path:'produit', component:ProduitComponent},
      {path:'commande/client', component:CommandeClientComponent},
      {path:'commande/fournisseur', component:CommandeFournisseurComponent},
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      {path:'**', redirectTo:'general', pathMatch:'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
