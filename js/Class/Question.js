export class Question{

    constructor(newType  , newLibelle , newObliger , ext ){

        this.type  = newType;
     
        this.libelle = newLibelle;
        this.obligatoire = newObliger;
        this.extendedclass = ext;
        this.modifier = true;
        this.id = 0;
        this.divid = 0;
        this.toUpdate = false;

    }



}