import { Client } from "./client.class";
import { LigneCommandeCl } from "./ligneCommandeCl.class";

export class CommandeClient{
  cdId?:number;
  cdDate!:Date;
  montant!:number;
  listLigne!:LigneCommandeCl[];
  cl!:Client;

}


/**
 * "cdId": 1,
        "cdDate": null,
        "montant": 45000.0,
        "statu": 0,
        "listLigne": [
            {
                "lcmdClId": 1,
                "quantitecmd": 15,
                "numProd": 1
            }
        ]
 */