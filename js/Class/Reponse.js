export class Reponse{

    constructor( idRep ,newType  , newLibelle , newObliger , ext , rep ){


        this.id = idRep;
        this.type  = newType;
      
        this.libelle = newLibelle;
        this.obligatoire = newObliger;
        this.extendedclass = ext;
        this.modifier = true;
        this.divid = 0;
        this.toUpdate = false;
        this.Reponse = rep;

    }



}