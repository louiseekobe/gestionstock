import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/app/shared/service/fournisseur.service';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss']
})
export class ApprovisionnementComponent implements OnInit {

  public search = '';
  result!:any;
  constructor(private frService:FournisseurService) { }

  ngOnInit(): void {
    this.frService.listFournisseur().subscribe(data=>{
      console.log(data);
      this.result = data;
    })
  }

}
