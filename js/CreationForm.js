import { Question } from './Class/Question.js';
import { Form } from './Class/Form.js';

//Variable Globale;
var question = 1;

var checkBoxCpt = 1;

var date = new Date();

var TitreForm;

// var terminate = true;
var listeObj = new Array();


/*---------------------------------------------------------------Ajax -------------------------------------------------------------------------- */
// Creer le Form ou lance la fonction qui permet de le charger 
if (sessionStorage.getItem('form') == "") {

   let today = getDdj();
   $.ajax({

      type: 'POST',
      url: 'http://localhost/projet-js-groupe-11/Controleur/CreateForm.php',
      data: {
         'email': sessionStorage.getItem('email'),
         'nom': "Nouveau Formulaire",
         'dateExp': "",
         'type': 8,
         'today': today
      },

      success: (data) => {
         console.log(data);
         let f = $('.NomForm');
         $(f).val('Nouveau Formulaire');
         sessionStorage.setItem('form', data.idForm);
         $(f).attr('id', sessionStorage.getItem('form'));
         console.log(sessionStorage.getItem('form'));
         TitreForm = new Form('Nouveau Formulaire', null);
         console.log("Reussite !");


      },
      error: (data) => {
         console.log(data);
         console.log("Rater !");

      }
   })

} else {
   LoadForm();
   LoadQuestion();

}


// Charge Le questionnaire 
function LoadForm() {
   $.ajax({

      dataType: 'json',
      type: 'POST',
      url: 'http://localhost/projet-js-groupe-11/Controleur/RecupData.php',

      data: {
         "id": sessionStorage.getItem('form'),
         "type": 1

      },
      success: (data) => {


         $('.NomForm').val(data.nom);

         if (data.dateExpiration != null) {
            $('.DateForm').val(data.dateExpiration)
            TitreForm = new Form('Nouveau Formulaire', data.dateExpiration);
         } else {
            TitreForm = new Form('Nouveau Formulaire', null);
         }

      },

      error: () => {
         console.log(data);
      }

   })
}


// Fait charger les question
function LoadQuestion() {

   $.ajax({
      dataType: "json",
      type: 'POST',
      url: 'http://localhost/projet-js-groupe-11/Controleur/RecupData.php',
      data: {
         "id": sessionStorage.getItem('form'),
         "type": 2
      },
      success: (data) => {

         initiateListe(data);
      },

      error: (err) => {
         console.log(err);
      }
   })

}


/*----------------------------------------------------------Enregistrement modification et suppresion dans la BD ------------------------------------------- */

// Permet de rajouter une question queqlque sois son type dans la bd
function ajaxCreateQuestion(obj, id) {
   $.ajax({

      type: "POST",
      url: "http://localhost/projet-js-groupe-11/Controleur/CreateForm.php",
      dataType: "json",
      data: {
         'type': obj.type,
         
         'libelle': obj.libelle,
         'obligatoire': obj.obligatoire,
         'extendedclass': obj.extendedclass,
         'id': sessionStorage.getItem('form')
      },

      success: (data) => {
         alert("Enregistrement Reussis");
         let idnum = data.id;

         obj.id = idnum;

         obj.divid = id;

         obj.modifier = false;

         obj.toUpdate = false;

         listeObj.push(obj);

         question++;
      },

      error: (data) => {
         console.log(data);
      }

   })

}

// update dans la bd si le form est modifier 
function insertModifaction(obj) {
   $.ajax({
      type: "POST",
      url: "http://localhost/projet-js-groupe-11/Controleur/CreateFormModif.php",
      data: {
         'type': obj.type,
         'libelle': obj.libelle,
         'obligatoire': obj.obligatoire,
         'id': obj.id,
         'extendedclass': obj.extendedclass
      },

      success: (data) => {

         obj.toUpdate = false;
         obj.modifier = false;

      },

      error: (data) => {

         console.log(data);
         console.log('echec');

      }

   })
}


function supprimerFormulaire(){
      $.ajax({
               type: "POST",
               dataType: "json",
               url: "http://localhost/projet-js-groupe-11/Controleur/SupprimeCopieForm.php",

               data : {
                        "type" : "1",
                        'id' : sessionStorage.getItem('form')
               },

               success: (data) => {
                     console.log(data);
                     sessionStorage.setItem('form', "");
                     alert('Questionnaire supprimer ! vous allez être redirger !');
                     window.location.href = "http://localhost/projet-js-groupe-11/home.html";
               }
      })
}


function saveTitre(e) {

   let text = $(e).children().eq(1);

   console.log(text);

   let datec = $(e).children().eq(3);



   let tab;

   let txt;
   let date;
   let id = $(text).attr('id');


   if ($(text).val() == "Nouveau Formulaire" && datec.val() == "") {
      return 0;
   }


   if ($(text).val() == "") {
      txt = "Nouveau Formulaire"
   } else {
      txt = $(text).val();
   }

   if (datec.val() == "") {
      date = null;
   } else {
      date = datec.val();

   }

   let today = getDdj();

   if (date > today || date == null) {
      $.ajax({
         type: "POST",
         url: 'http://localhost/projet-js-groupe-11/Controleur/CreateFormModif.php',
         data: {

            'type': 0,

            'nom': txt,

            'dateExp': date,

            'email': sessionStorage.getItem('email'),

            'id': sessionStorage.getItem('form'),

            'today': today

         },

         success: (data) => {
            alert("Modification Reussis !");
            TitreForm.nom = $('.NomForm').val();
            console.log($('.NomForm').val());
            TitreForm.data_Expiration = $('.DateForm').val();
         },

         error: (data) => {
            console.log(data);
         }

      })
   } else {
      alert('La date expiration doit être supérieur a la date du jour !');
      return -1;
   }

}




/*---------------------------------------------------Ajout de question dynamique dans le Dom ------------------------------- */
//Ajouter une question

$('#ajouter').click(() => {

   // if (terminate == false) {
   //    return alert("Veuillez remplir la question ");
   // }

   if($('#select-question').val() != null)
         // terminate = false;
   //Selectionner le type de question
   switch ($('#select-question').val()) {

      case "1": ajouterQuestionListeDeroulante();
         break;
      case "2": ajouterReponseCourte();
         break;

      case "3": ajoutReponseLongue();
         break;

      case "4": ajouterQuestionCocher();
         break;

      case "5": ajouterQuestionUnique();
         break;

      case "6": ajouterQuestionDate();
         break;

      case "7": ajouterQuestionNumerique();
         break;


   }

})

/*-----------------------------------------------Fonction Ajout de questions  dans le Formulaire-------------------------------------*/

// Ajout d'une question numerique
function ajouterQuestionNumerique( obj = null) {

   let ti;
   let li;
   let opt;
   let obl;
   if (obj != null) {
   
      li = obj.libelle;
      obl = obj.obligatoire;
      opt = obj.extendedclass;
   }

   let icone = createIcon();

 
   
   //Libelle question  : "
   let libelle = createLibelleNumerique(li, opt);
   //Question Obligatoire
   let obliger = createBoutonObligatoire(obl);

   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');

   //On ajoute toutes les div 

   ajouterDiv(7, icone, libelle, btn, obliger);

}

//Permet de rajouter un champ a reponse courte 
function ajouterReponseCourte(obj = null) {
   // Insertion de l'icone de suppression 

   let icone = createIcon();
   let ti;
   let li;
   let obl;
   if (obj != null) {
      li = obj.libelle;
      obl = obj.obligatoire;
   }


  
   //Libelle question  : "
   let libelle = createLibelle(li);
   //Question Obligatoire
   let obliger = createBoutonObligatoire(obl);

   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   ajouterDiv(2, icone, libelle, btn, obliger);


}

//Permet de rajouter une div avec une question avec une liste deroulante
function ajouterQuestionListeDeroulante(objet = null) {

   let ti;
   let li;
   let obl;
   if (objet != null) {
     
      li = objet.libelle;
      obl = objet.obligatoire;
   }
   // On créér l'icone poubelle
   let icone = createIcon();


   //Intitule Question;
 

   //Libelle question  : "
   let libelle = createLibelle(li);


   //Liste deroulante 

   let divliste = document.createElement('div');

   $(divliste).addClass("Liste-Deroulante-" + question);

   let select = $('<select ' + ' id=' + 'Liste-' + question + '  class="liste"> ');
   if (objet != null) {
      let options = objet.extendedclass;

      for (let i = 0; i < options.length; i++) {
         let elem = document.createElement('option');
         $(elem).addClass('optionClass');
         $(elem).attr('id', 'option' + checkBoxCpt);
         $(elem).text(options[i]);
         checkBoxCpt++;
         select.append(elem);
      }
   }

   select.attr('name', "Liste-" + question);

   $(divliste).append(select);

   // Bouton Ajout Element a la  liste

   let divajout = document.createElement('div');

   $(divajout).addClass("Ajout-elem");

   $(divajout).append('<label class="Checkbox-Obligatoire" >Ajouter une element </label>');
   $(divajout).append(' <input type="text" ' + 'id=' + 'AjouterListe-' + question + ' class="add-Elem" >');
   $(divajout).append('<input type="button" ' + 'id=' + 'ajouterBoutonListe-' + question + ' value="Ajouter" class="ajout-option">');

   // Boutton Supprimer/Modifier Element

   let divModif = document.createElement('div');

   $(divModif).addClass("Modif-supp-elem-" + question);

   $(divModif).append('  <label class="Checkbox-Obligatoire" > Modifier/Supprimer une element </label>');

   $(divModif).append('   <input type="text" ' + 'id=' + 'SuppModifListe-' + question + ' class="Modif-Elem" >');
   $(divModif).append('   <input  type="button" value="Modifier" ' + 'id=' + 'modfierListeBouton-' + question + ' class="modif-option">');
   $(divModif).append('   <input type="button" value="Supprimer" ' + 'id=' + 'suppListeBouton-' + question + ' class="supp-option">');


   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   // Boutton Obligatoire


   let obliger = createBoutonObligatoire(obl);




   ajouterDiv(1, icone, libelle, divliste, divajout, divModif, btn, obliger);




}



// Ajout de question avec champs long
function ajoutReponseLongue(objet = null) {

   let ti;
   let li;
   let obl;
   if (objet != null) {
    
      li = objet.libelle;
      obl = objet.obligatoire;
   }



   let icone = createIcon();

   //Intitule Question



   //Libelle question  : "


   let Libelle = createLibelle(li);

   //Div reponse Longue 
   let DivL = document.createElement('div');

   $(DivL).addClass('reponse-Longue');

   $(DivL).attr('id', 'reponse-Longue-' + question);

   $(DivL).append('<textarea  rows="10">');

   //Bouton Obligatoire 

   let obliger = createBoutonObligatoire(obl);

   //Ajout des divs dans le dom

   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   ajouterDiv(3, icone, Libelle, DivL, btn, obliger);


}


// Ajout de question de type date
function ajouterQuestionDate(objet = null) {
   let ti;
   let li;
   let obl;


   if (objet != null) {
    
      li = objet.libelle;
      obl = objet.obligatoire;
   }
   let icone = createIcon();
  
   let libelle = createLibelle(li);
   let obliger = createBoutonObligatoire(obl);
   let date = document.createElement('div');
   $(date).addClass('Ajout-Date');
   $(date).append(' <input type="date" ' + 'id=' + 'questionDate-' + question + ' placeholder="Libelle" class="question-Date"   >');

   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   ajouterDiv(6, icone, libelle, date, btn, obliger);

}

// Ajout de question checkbox
function ajouterQuestionCocher(objet = null) {
   let ti;
   let li;
   let obl;
   let opt;

   if (objet != null) {
    
      li = objet.libelle;
      opt = objet.extendedclass;
      obl = objet.obligatoire;
   }


   let icone = createIcon();
 
   let libelle = createLibelle(li);
   let obliger = createBoutonObligatoire(obl);

   let cochage = document.createElement('div');
   $(cochage).addClass('Ajout-CheckBox');
   $(cochage).append(' <label style="color: black"  class="Check-BoxIntitule"   >Libelle de la case  :</label>');
   $(cochage).append(' <input type="text" placeholder="Libelle" ' + 'id=' + 'CheckBoxTest-' + question + ' class="question-CheckBox"   >');
   $(cochage).append(' <input type="button"  class="addCheckBox"  ' + 'id=' + 'checkBoxAdd-' + question + ' value="Ajouter" >');

   let supp = document.createElement('div');

   $(supp).addClass('modif-CheckBox');
   $(supp).append('<label style="color: black"  class="Check-BoxIntitule"   >Modifier/Supprimer une case :</label>');
   $(supp).append(' <input type="text"  placeholder="Selectionner un champs" ' + 'id=' + 'CheckBoxModif-' + question + ' class="question-CheckBox"   >');
   $(supp).append(' <input type="button"   class="SuppCheckBox"  ' + 'id=' + 'checkBoxSupp-' + question + ' value="Supprimer" >');
   $(supp).append(' <input type="button"   class="ModifCheckBox"  ' + 'id=' + 'checkBoxModif-' + question + ' value="Modifier" >');


   let reponseArea = document.createElement('div');
   $(reponseArea).addClass('reponseArea');
   $(reponseArea).attr('id', 'reponseArea-' + question);


   if (objet != null) {
      for (let i = 0; i < opt.length; i++) {
         let Elem = document.createElement('div');

         $(Elem).addClass('ReponseCheckBox');

         $(Elem).attr('id', 'ReponseCheckBox-' + checkBoxCpt);
         $(Elem).attr('question', question);

         let Ou = document.createElement('label');
         $(Ou).attr('id', 'CheckLabel-' + checkBoxCpt);

         $(Ou).addClass('Label-CheckBox');

         $(Ou).text(opt[i]);

         $(Elem).append(Ou);

         $(Elem).append('<input class="CheckBoxajouter" ' + "id=CheckBox-" + checkBoxCpt + ' type="checkbox">');

         $(reponseArea).append(Elem);

         checkBoxCpt++;

      }
   }


   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   ajouterDiv(4, icone, libelle, cochage, supp, reponseArea, btn, obliger);



}


// Ajout de question radio btn
function ajouterQuestionUnique(objet = null) {

   let ti;
   let li;
   let obl;
   let opt;

   if (objet != null) {
     
      li = objet.libelle;
      opt = objet.extendedclass;
      obl = objet.obligatoire;
   }
   let icone = createIcon();
  
   let libelle = createLibelle(li);
   let obliger = createBoutonObligatoire(obl);

   let cochage = document.createElement('div');
   $(cochage).addClass('Ajout-CheckBox-' + question);
   $(cochage).append(' <label style="color: black"  class="Check-BoxIntitule"   >Libelle de la case  :</label>');
   $(cochage).append(' <input type="text" placeholder="Libelle" ' + 'id=' + 'CheckBoxTest-' + question + ' class="question-CheckBox"   >');
   $(cochage).append(' <input type="button"  class="addCheckBox"  ' + 'id=' + 'checkBoxAdd-' + question + ' value="Ajouter" >');

   let supp = document.createElement('div');

   $(supp).addClass('modif-CheckBox');
   $(supp).append('<label style="color: black"  class="Check-BoxIntitule"   >Modifier/Supprimer une case :</label>');
   $(supp).append(' <input type="text"  placeholder="Selectionner un champs" ' + 'id=' + 'CheckBoxModif-' + question + ' class="question-CheckBox"   >');
   $(supp).append(' <input type="button"   class="SuppCheckBox"  ' + 'id=' + 'checkBoxSupp-' + question + ' value="Supprimer" >');
   $(supp).append(' <input type="button"   class="ModifCheckBox"  ' + 'id=' + 'checkBoxModif-' + question + ' value="Modifier" >');

   let reponseArea = document.createElement('div');
   $(reponseArea).addClass('reponseArea');
   $(reponseArea).attr('id', 'reponseArea-' + question);

   if (objet != null) {
      for (let i = 0; i < opt.length; i++) {
         let Elem = document.createElement('div');

         $(Elem).addClass('ReponseCheckBox');

         $(Elem).attr('id', 'ReponseCheckBox-' + checkBoxCpt);
         $(Elem).attr('question', question);


         let Ou = document.createElement('label');
         $(Ou).attr('id', 'CheckLabel-' + checkBoxCpt);

         $(Ou).addClass('Label-CheckBox');

         $(Ou).text(opt[i]);

         $(Elem).append(Ou);

         $(Elem).append('<input class="CheckBoxajouter" ' + "id=CheckBox-" + checkBoxCpt + ' type="radio">');

         $(reponseArea).append(Elem);

         checkBoxCpt++;

      }
   }

   let btn = $('<input class="EnregistreQuestion"   type="submit" value="Enregistrer" id=' + 'REC-' + question + '>');
   ajouterDiv(5, icone, libelle, cochage, supp, reponseArea, btn, obliger);

}

/*-------------------------------------------------------Element commun a toute les div----------------------------------------- */

// Creation icone de suppression de question
function createIcon() {

   let icone = document.createElement('img');

   icone.src = "images/iconmonstr-trash-can-27.png";

   $(icone).attr('id', 'image-' + question);



   return $(icone).addClass('imageTrash');
}





// Creation d'un champ pour choisir une bréve explication de la question
function createLibelle(text = null) {

   let libelle = document.createElement('div');

   $(libelle).addClass("libelle-question");


   $(libelle).append('  <label  class="label-intitule"   >Libelle de la question :</label>');

   let doc = $(' <input required type="text"  ' + 'id=' + 'Intitule-' + question + ' class="question-courte"   >');

   if (text != null) {
      doc.attr('value', text);
   }

   return $(libelle).append(doc);


}

function createLibelleNumerique(li = null, opt = null) {

   let libelle = document.createElement('div');

   $(libelle).addClass('libelle-question');
 
   $(libelle).append('<label for="nom" class="label-intitule">' + 'Veuillez entre le libelle de la question' + '</label>');
   let doc = $(' <input required name="nom" type="text"  ' + 'id=' + 'Intitule-' + question + ' class="question-courte"   >');
   if(li != null)
      doc.attr('value', li)
   $(libelle).append(doc);


   $(libelle).append('<label for="cible" class="label-intitule">' + 'Veuillez entre la valeur de la cible ' + '</label>');

   let cible = $(' <input required name="cible" type="text"  ' + 'id=' + 'cible-' + question + ' class="question-courte"   >');
   if (opt != null) {
      cible.attr('value', opt[0]);
   }
   $(libelle).append(cible);

   let pas = $(' <input required name="pas" type="text"  ' + 'id=' + 'pas-' + question + ' class="question-courte"   >')
   if (opt != null) {
      pas.attr('value', opt[1]);
   }
   $(libelle).append('<label for="pas" class="label-intitule">' + 'Veuillez entre la valeur du pas ' + '</label>');
   $(libelle).append(pas);
   return libelle;

}

// Creation du bouton qui permet de rendre une question Obligatoire 
function createBoutonObligatoire(number = null) {


   let obliger = document.createElement('div');

   $(obliger).addClass("obligatoire");

   $(obliger).append('  <label class="Checkbox-Obligatoire" > Rendre le champs obligatoire :</label>');

   let elem = $('<input type="checkbox" ' + 'id=' + 'BoutonObligatoire-' + question + ' class="obliger">')

   elem.attr('name', 'Obligatoire-' + question);
   if (number == 1 && number != null) {
      elem.attr('checked', true);
   }

   return $(obliger).append(elem);

}


// Permet de rajouter toutes les element dans la question
function ajouterDiv(...divA) {

   let div = $('<div   class="question">');
   $(div).attr('typeQuestion', divA[0]);
   $(div).attr('id', 'question-' + question);
   let cpt = 0;



   divA.forEach((elem) => {
      if (cpt != 0)
         div.append(elem);

      cpt++;
   })

   $(".Formulaire").append(div);

   question++;

}




/*------------------------------------------------------ Evenement du DOM ---------------------------------------------------------*/



$('#dupliquer').click(()=>{
    if(confirm("Etes vous sur de vouloir dupliquer le formulaire ? ")){
        dupliqueForm();
    }
})





// Supprime une Question
$('.Formulaire').delegate('.imageTrash', 'click', (e) => {



   if (confirm("Etes cous sur de supprimer la question ? ")) {
      let deleteIndex = getIdElem(e);
      $("#question-" + deleteIndex).remove();
      // terminate = true;
      let cible;
      let cpt = 0;
      let trouve = false;

      for (let i = 0; i < listeObj.length; i++) {
         let boucle = listeObj[i];
         if (boucle.divid == deleteIndex) {
            cible = listeObj[i];
            trouve = true;
            listeObj.splice(i, 1);

         }
      }
      if (trouve == true) {

         $.ajax({
            url: "http://localhost/projet-js-groupe-11/Controleur/CreateFormModif.php",
            type: "POST",
            dataType: "json",
            data: {
               'id': cible.id,
               'type': 8
            },

            success: (data) => {
               console.log(data);
            },

            error: (data) => {
               console.log(data);
            }
         })

      }

   }



}


)


// Ajouter checkBox dans une question  type CheckBox
$('body').delegate('.addCheckBox', 'click', (e) => {


   onModify(e);
   let target = e.currentTarget;

   let nomquestion = $(target).attr('id');

   let addIndex = getIdElem(e);





   if ($('#CheckBoxTest-' + addIndex).val() == "") {

      $('#CheckBoxTest-' + addIndex).attr('placeholder', "Veuillez entrer une valeur svp !");
      $('#CheckBoxTest-' + addIndex).css('border-color', 'red');


   } else {

      let nb = checkBoxCpt;

      checkBoxCpt++;

      let elements = $(".Label-CheckBox");



      let Elem = document.createElement('div');
      $(Elem).addClass('ReponseCheckBox');

      $(Elem).attr('id', 'ReponseCheckBox-' + nb);
      $(Elem).attr('question', addIndex);

      let label = document.createElement('label');


      $(label).attr('id', 'CheckLabel-' + nb);


      $(label).attr('name', nomquestion + "-" + 'Elem-' + nb);


      $(label).addClass('Label-CheckBox');

      $(label).text($('#CheckBoxTest-' + addIndex).val());


      $(Elem).append(label);

      let typeQuestion = $('#question-' + addIndex).attr('typeQuestion');
      if (typeQuestion == 4)
         $(Elem).append('<input class="CheckBoxajouter" ' + "id=CheckBox-" + nb + ' type="checkbox">')

      if (typeQuestion == 5)
         $(Elem).append('<input class="CheckBoxajouter" ' + ' name= radioButton-' + addIndex + ' " id=radioButton-" ' + nb + ' type="radio">')



      $('#CheckBoxTest-' + addIndex).css('border-color', 'black');

      onModify(e);

      $('form  #reponseArea-' + addIndex).append(Elem);

      $('#CheckBoxTest-' + addIndex).val("");

   }

})



// Permet de recupere la question qu'on veut supp ou modif 
$('body').delegate('.ReponseCheckBox', 'click', (e) => {

   let target = e.currentTarget;

   let elem = target.firstChild;




   let txt = $(elem).text();

   let id = $(elem).attr('id');

   let split_id = id.split("-");

   let nombre = split_id[1];




   let addIndex = $(target).attr('question');

   let nb = getIdElem(e);



   $('#CheckBoxModif-' + addIndex).val(txt);

   $('#CheckBoxModif-' + addIndex).attr('nb', nb);


})


// Permet de supprimer une checkbox dans une question
$('form').delegate('.SuppCheckBox', 'click', (e) => {

   onModify(e);
   let target = e.currentTarget;

   let id = getIdElem(e);

   let nb = $('#CheckBoxModif-' + id).attr('nb');


   if (confirm("Etes cous sur de supprimer la checkBox ? ")) {
      onModify(e);
      $('form #ReponseCheckBox-' + nb).remove();
   }


})

// Permet de modifier une checkBox dans une question
$('form').delegate('.ModifCheckBox', 'click', (e) => {

   onModify(e);
   let id = getIdElem(e);

   let text = $('#CheckBoxModif-' + id).val();

   let nb = $('#CheckBoxModif-' + id).attr('nb');

   //   let d = $('form #ReponseCheckBox-' + nb + ':first-child');

   let d = document.querySelector('#ReponseCheckBox-' + nb);

   let child = d.firstChild;

   if (confirm("Etes cous sur de modifier la checkBox ? ")) {
      onModify(e);
      $(child).text(text);

   }

   $('#CheckBoxModif-' + id).val("");


})


//Permet de rajouter une element dans une question liste
$('body').delegate('.ajout-option', 'click', (e) => {
   let id = getIdElem(e);
   let target = e.currentTarget;
   let questionN = $(target).attr('id');

   if ($('#AjouterListe-' + id).val() == "") {

      $('#AjouterListe-' + id).css('border-color', 'red');
      $('#AjouterListe-' + id).attr('placeholder', 'Veuillez entre un champs svp');
   } else {
      let txt = $('#AjouterListe-' + id).val();

      let nb = checkBoxCpt;

      checkBoxCpt++;

      let option = $('<option>     ' + txt + '</option>');

      option.attr('id', 'option' + nb);



      option.addClass('optionClass');

      $('#Liste-' + id).append(option);

      onModify(e);

      $('#AjouterListe-' + id).val("");

      if (nb == 1) {
         $('#SuppModifListe-' + id).val(txt);
         $('#SuppModifListe-' + id).attr('nb', id);
      }


   }
})

// Permet de detecter si un element a ete  choisis dans une question liste
$('body').delegate('.liste', 'change', (e) => {

   let id = getIdElem(e);
   if ($('#Liste-' + id).children().length > 0) {

      let options = $('#Liste-' + id).children(':selected');
      $('#SuppModifListe-' + id).val("");
      $('#SuppModifListe-' + id).val($.trim($(options).text()));
      $('#SuppModifListe-' + id).attr('nb', $(options).attr('id'));
   }

})

// Supprimer un champ dans la liste
$('body').delegate('.supp-option', 'click', (e) => {
   let id = getIdElem(e);

   if ($('#SuppModifListe-' + id).val() == "") {


      $('#SuppModifListe-' + id).css('border-color', 'red');
      $('#SuppModifListe-' + id).attr('placeholder', 'Veuillez entre un champs svp');

   } else {

      if (confirm('Etes vous sur de supprimer le champ ? ')) {
         let nb = $('#SuppModifListe-' + id).attr('nb');

         $('#Liste-' + id).children(':selected').remove();

         $('#SuppModifListe-' + id).val("");
         onModify(e);
      }

      if ($('#Liste-' + id).children().length == 1) {
         $('#SuppModifListe-' + id).val($('#Liste-' + id).children().eq(0).val());
      }

   }


})



$('body').delegate('.intitule', 'input', (e) => {

   onModify(e);

})


$('body').delegate('.obliger', 'changes', (e) => {
   onModify(e);
})

// Si le bouton obligatoire d'une question est cocher/Decocher son etat passe en modifier 
$('body').delegate('.obliger', 'click', (e) => {

   onModify(e);
})

// Si une question courte est modifier son etat passe en modifier 
$('body').delegate('.question-courte', 'input', (e) => {
   onModify(e);
})

// Si la nom d'un formulaire est changer son etat passe en modifier 
$('body').delegate('.NomForm', 'input', (e) => {
   TitreForm.modifier = true;

})

// Si la date d'un formulaire est changer son etat passe en modifier 
$('.DateForm').change(() => {
   TitreForm.modifier = true;

})



// Modifie un champs dans la liste
$('body').delegate('.modif-option', 'click', (e) => {
   let id = getIdElem(e);


   if ($('#SuppModifListe-' + id).val() == "") {


      $('#SuppModifListe-' + id).css('border-color', 'red');
      $('#SuppModifListe-' + id).attr('placeholder', 'Veuillez entre un champs svp');

   } else {

      if (confirm('Etes vous sur de modifier le champ ? ')) {
         let nb = $('#SuppModifListe-' + id).attr('nb');

         $('#Liste-' + id).children(':selected').text($('#SuppModifListe-' + id).val());

         $('#SuppModifListe-' + id).val("");

         onModify(e);

      }

   }


})



// permet de mettre le bouton en orange
$("#ajouter").mouseover(() => {
   $("#ajouter").css('background', 'orange');

   $("#ajouter").css('color', 'white');
})

// Permet de remetre le bouton tel qu'il etait apres l'avoir parcourue
$("#ajouter").mouseout(() => {
   $("#ajouter").css('background', 'lightgrey');
   $("#ajouter").css('color', 'black');
})


//Bouton  qui permet enregistrer une question il est unique a chaque div 
$('.Formulaire').delegate('.EnregistreQuestion', 'click', (e) => {

   e.preventDefault();
   let id = getIdElem(e);
   
   click(id);
  

})

//Supprimer le forulaire !!!
$('#supprimer').click((e)=>{
   if(confirm('Attention cette action est irreversible !')){
       supprimerFormulaire();
   }
})


// Permet de revenir a l'acceuil
$('#comback').click((e) => {
  window.location.href = "http://localhost/projet-js-groupe-11/home.html";
})


// Permet enregistrer le formulaire dans son entiereter !
$('#complete').click((e) => {

   var temp = window.alert;
  window.alert = function() { };
  
   let div = $('.Formulaire').children();
  
   for(let i = 0 ; i < div.length; i++) {
      
        let nom = $(div[i]).attr('id');
        let split  = nom.split("-");
       
        click(split[1]);
     }
  
  window.alert = temp;
  alert('Tout à été enregistré !');
  
})





/*----------------------------------------- Fonction divers -----------------------------------------------------*/




// Get le libelle d'une question
function getLibelle(e) {
   let div = $(e).children().eq(1);
   if ($(div).children().eq(1).val() == "") {
      alert("Veuillez entrer un libelle  ! ");
   } else {
      return $(div).children().eq(1).val();
   }

}


//Get la valeur du bouton obligatoire 
function getObligatoire(e) {
   let div = $(e).children(':last-child');
   return $(div).children().eq(1).is(':checked');
}



// Créer un objet de type question a partir d'un id de DIV dans le formulaire
function getObj(id) {


   let bool;
   let div = $('#question-' + id);
   let type = $('#question-' + id).attr('typequestion');
   
   let libelle = getLibelle(div);
   if (libelle == null)
      return libelle;
   let oblij = getObligatoire(div);

   if (oblij == true)
      bool = 1
   else
      bool = 0;

   let obj =  new Question(type, libelle, bool, null);
  
   return obj;

}


// Permet de changer le statut d'un objet comme etant modifier afin de update la BD
function onModify(e) {

   if (listeObj.length > 0) {
      let obj;
      let id = getIdElem(e);
      let trouve = false;

      listeObj.forEach(element => {
         if (element.divid == id) {
            obj = element;
            trouve = true;
         }

      })
      if (trouve == true)
         obj.toUpdate = true;

   }

}


function updateQuestion(obj) {
   if (obj != null) {
      if (obj.toUpdate == true) {
         obj.libelle = $('#Intitule-' + obj.divid).val();
         if ($('#BoutonObligatoire-' + obj.divid).is(':checked') == true)
            obj.obligatoire = 1;
         else
            obj.obligatoire = 0;
         if (obj.type == "2" || obj.type == "3" || obj.type == "6") {
        
            insertModifaction(obj);

         } 
         if (obj.type == "4" || obj.type == "5") {

            let area = $('#reponseArea-' + obj.divid).children();
            let quest = new Array();
            if (area.length < 1) {
               alert('Veuillez ajouter un moin un element svp');
               return;
            } else {
               for (let i = 0; i < area.length; i++) {
                  let elem = area[i];
                  let txt = $(elem).children().eq(0).text();
                  quest.push(txt);
               }
               let json = JSON.stringify(quest);
               obj.extendedclass = json;

               insertModifaction(obj)
            }

         } else  if (obj.type == "1") {

               let option = new Array();

               for (let i = 0; i < $('#Liste-' + obj.divid).children().length; i++) {
                  let elem = $('#Liste-' + obj.divid).children().eq(i)

                  option.push($.trim(elem.text()));
                  console.log($.trim(elem.text()));
               }

               let json = JSON.stringify(option);
               obj.extendedclass = json;

               insertModifaction(obj);

            } else if(obj.type == "7") {

               let reg = /^\d+$/;


               let Cible = $("#cible-" + obj.divid).val();
               let val = $('#pas-' + obj.divid).val();

               if (reg.test(val) && reg.test(Cible)) {
                  let array = new Array();
                  array.push(val);
                  array.push(Cible);
                  obj.extendedclass = JSON.stringify(array);
                  insertModifaction(obj);

               } else {
                  alert("Seule les nombres sont admis !");
               }

            }

      } else {
            alert('La question n\'a pas ete modifier');
      }

   }
}


//Permet enregistrer une reponse a partir d'un id int de div 
function click(id){

   let obj;

   if (id == 0) {
      if (TitreForm.modifier == true) {
         if (TitreForm.nom == $('.NomForm').val() && TitreForm.data_Expiration == $('.DateForm').val()) {
            alert('Les informations sont les même que les precedente !');
            TitreForm.modifier = false;
            return;
         } else saveTitre($('.nomFormulaires'));
      } else alert('Question deja enregsitrer !');

      TitreForm.modifier = false;
      return;
   }


   listeObj.forEach(element => {
      if (element.divid == id)
         obj = element;
   })




   if (obj == null)
   {
      obj = getObj(id);
      console.log("ahahha");
   }
     

   console.log(obj);

   if (obj.toUpdate == true) {
      updateQuestion(obj);
      obj.modifier = false;
      alert('Question modifier !!');
      return;
   }


   if (obj != null) {
      if ((obj.type == "7" || obj.type == "5" || obj.type == "4" || obj.type == "1") && obj.modifier == true) {
         if (obj.type == "4" || obj.type == "5") {

            let area = $('#reponseArea-' + id).children();
            let quest = new Array();
            if (area.length < 1) {
               alert('Veuillez ajouter un moin un element svp');
               return;
            } else {
               for (let i = 0; i < area.length; i++) {
                  let elem = area[i];
                  let txt = $(elem).children().eq(0).text();
                  quest.push(txt);
               }
               let json = JSON.stringify(quest);
               obj.extendedclass = json;
               ajaxCreateQuestion(obj, id);

            }
         } else if (obj.type == "1") {


            let option = new Array();

            for (let i = 0; i < $('#Liste-' + id).children().length; i++) {
               let elem = $('#Liste-' + id).children().eq(i)

               option.push($.trim(elem.text()));
               
            }

            let json = JSON.stringify(option);
           
            obj.extendedclass = json;

            ajaxCreateQuestion(obj, id);

         } else {
            let reg = /^\d+$/;


            let Cible = $("#cible-" + id).val();
            let val = $('#pas-' + id).val();

            if (reg.test(val) && reg.test(Cible)) {
               let array = new Array();
               array.push(val);
               array.push(Cible);
               obj.extendedclass = JSON.stringify(array);
               ajaxCreateQuestion(obj, id);

            } else {
               alert("Seule les nombres sont admis !");
            }

         }

         listeObj.push(obj);
         // terminate = true;

      } else {
         if (obj != null && obj.modifier == false) {
            alert('Question a deja ete enregistrer ');
         } else {
            ajaxCreateQuestion(obj, id);

         }

      }
   }


}


function initiateListe(data) {
   for (let i = 0; i < data.length; i++) {
      let obj = new Question(data[i].typeQuestion, data[i].libelle, data[i].obligatoire, JSON.parse(data[i].extraInformation));

      obj.id = data[i].idQuestion;
      obj.modifier = false;
      obj.toUpdate = false;
      listeObj.push(obj);
   }

   afficheQuestion();
}

function afficheQuestion() {
   for (let i = 0; i < listeObj.length; i++) {
      listeObj[i].divid = question;
      listeObj[i].modifier = false;

      switch (listeObj[i].type) {
         case "1": ajouterQuestionListeDeroulante(listeObj[i]);
            break;
         case "2": ajouterReponseCourte(listeObj[i]);
            break;
         case "3": ajoutReponseLongue(listeObj[i]);
            break;
         case "4": ajouterQuestionCocher(listeObj[i]);
            break;
         case "5": ajouterQuestionUnique(listeObj[i]);
            break;
         case "6": ajouterQuestionDate(listeObj[i]);
            break;
         case "7": ajouterQuestionNumerique(listeObj[i]);
            break;
      }
   }
}


function dupliqueForm(){
     $.ajax({
          
         dataType: "json",
         url: "http://localhost/projet-js-groupe-11/Controleur/SupprimeCopieForm.php",
         type: 'POST',
         data : {
               'id' : sessionStorage.getItem('form'),
               'type' : 2,
                'date' :  getDdj(),
                'email' : sessionStorage.getItem('email'),
                'nom' : $('.NomForm').val(),
         },

         success: (data)=>{
            alert('Questionnaire copier !');
         },
         error: (data)=>{
             console.log(data);
         }
     })
}


