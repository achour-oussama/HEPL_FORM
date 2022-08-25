import { Form } from './Class/Form.js';
import {Reponse} from './Class/Reponse.js';


var listeObj = new Array();





var iddiv = 1;


loadForm();

function loadForm(){
    let str = window.location.href
    let url = new URL(str);
    let param = url.searchParams.get("form");
    

    $.ajax({
        dataType: 'json',
        url: "http://localhost/projet-js-groupe-11/Controleur/ReponseForm.php",
        type: 'POST',
        data : {
              'type' : 0,
              'param' : param
        },
        success: (e)=>{
            
             loadquestion(param);
             let titreForm = new Form(e[0] , e[1] );
             afficheNom(titreForm);
        },
        error: (e)=>{
            console.log(e);
        }
    })


}

function loadquestion(param){

        
    $.ajax({
        dataType: 'json',
        url: "http://localhost/projet-js-groupe-11/Controleur/ReponseForm.php",
        type: 'POST',
        data : {
              'type' : 9,
              'param' : param
        },
        success: (e)=>{
            initiateListe(e);
        },
        error: (e)=>{
            console.log(e);
        }
    })

}


function enregistreQuestionSimple(id  , cible){

    let reponse;
    if($('#reponse-' + id).text() == null && cible.obligatoire == 1){
       alert('Le champs ' + cible.libelle + 'est obligatoire la question n\'est pas enregistre!');
    }else if($('#reponse-' + id).text().length > 50){
        alert('Le champs ' + cible.libelle + 'ne doit pas deppasser 50 caractére ! ');
    }else{

        reponse = $('#reponse-' + id).val();
      
        cible.Reponse = reponse;
       insertQuestion(cible);
    }
    
    
       
 }

 function enregistreQuestionLongue(id , cible){


    if($('#reponse-' + id).val().length == 0 && cible.obligatoire == 1){
       alert('Le champs ' + cible.libelle + '  est obligatoire la question n\'est pas rengristrer!');
    }else if($('#reponse-' + id).val().length > 500){
        alert('Le champs ' + cible.libelle + '  ne doit pas deppasser 500 caractére ! ');
    }else{

        console.log($('#reponse-' + id).val());
        // reponse = $('#reponse-' + id).val();
        // console.log(reponse);
        cible.Reponse = $('#reponse-' + id).val();
        insertQuestion(cible);
    }

 }

 
      



function insertQuestion(obj){
  
    $.ajax({

        type : 'POST' ,
        dataType : 'json',
        url : 'http://localhost/projet-js-groupe-11/Controleur/ReponseForm.php',
        data : {
                 "id" : obj.id,
                 "reponse" : obj.Reponse,
                 "type" : 1

        },
        success : (e)=>{
                 alert("Enregistrement réussis !")
        },
        error: (e)=>{
                 console.log(e);
        }
   
 })
}



function initiateListe(data) {
    for (let i = 0; i < data.length; i++) {
       let obj = new Reponse(data[i].idReponse , data[i].typeQuestion ,  data[i].libelle , data[i].obligatoire , data[i].extentedClass , data[i].Reponse);


       afficheQuestion(obj);
       listeObj.push(obj);

     

       iddiv++;


    }

   let envoie = $('<div ><button id="envoie" type="submit" class="btn btn-success">Envoyer </button></div>') ;

   $('form').append(envoie);

    
 }

 function afficheNom(ti){
    let div = $('<div class="FormulairesReponse"> </div>');
    let divdate;
    div.append('<label class="NomformLabel"> ' + ti.nom + '</label>');
    if(ti.data_Expiration != null){
        div.append('<label class="NomformLabel"> ' + 'Date expiration :' + '</label>');
        divdate = $('<div class="NomformLabel"> ');
        let input = $('<input disabled type="date" class="DataForm">');
       
        $(input).val(ti.data_Expiration);
        divdate.append(input);
        $(div).append(divdate);
        $('form').append(div);
    }else{
       
         $('form').append(div);
    
    }


 }

 function afficheQuestion(obj){

     switch(obj.type){


        case "1" : afficheQuestionListe(obj);
        break;

        case "2" : afficheQuestionCourte(obj);
        break;

        case "3" : afficheQuestionLongue(obj);

        break;


        case "4" : affichequestionCheckBox(obj);
        break;


        case  "5" : affichequestionCheckBox(obj);
        break;

       
        case "6" : afficheQuestionDate(obj);
        break;

        case "7" : afficheQuestionCourte(obj);
        break;


     }

 }



 function afficheQuestionDate(obj){
    let div = createTitre(obj);

    let divD = document.createElement("div");


    let date = document.createElement("input");

    $(date).addClass("reponseCourteForm");

    $(date).attr('type' , 'date');

    $(date).attr('id' , 'reponse-' + obj.id);

    $(divD).append( date);

    $(div).append(divD);

    if(obj.obligatoire == 1){
        div.append(createObligatoire(obj));
    }
    let btn  = creerBtnEnregistrer(obj);
      
    div.append(btn);

    $('form').append(div);

    if(obj.Reponse != null){
        $('#reponse-' + obj.id).val(obj.Reponse);
    }

 }

 function affichequestionCheckBox(obj){

    let div = createTitreLong(obj);

    let divArea = document.createElement("div");

    $(divArea).addClass('reponseArea');

    $(divArea).attr('id' , 'reponseArea-' + obj.id);


    if(obj.extendedclass != null){
        let ext = JSON.parse(obj.extendedclass);
  
        for(let i = 0; i < ext.length; i++){
            let divCheckBox = document.createElement("div");
            let label = document.createElement("label");
            $(divCheckBox).addClass('ReponseCheckBox');
            $(label).addClass('Label-CheckBox');
            $(label).text(ext[i]);
           
            if(obj.type == 4){
                let input = document.createElement("input");
                $(input).attr("type", "checkbox");
                $(input).addClass('CheckBoxajouter');
                $(divCheckBox).append(label);
                $(divCheckBox).append(input);
            }else{
                let input = document.createElement("input");
                $(input).attr("type", "radio");
                $(input).addClass('CheckBoxajouter');
                $(input).attr("name", "checked-" + obj.id);
                $(divCheckBox).append(label);
                $(divCheckBox).append(input);
            }

            $(divCheckBox).append(label);
            $(divArea).append(divCheckBox);

          
        }

    }

    $(div).append(divArea);

    
    if(obj.obligatoire == 1){
        

        $(div).append(createObligatoire(obj));
    }

    
      let btn  = creerBtnEnregistrer(obj);
      
      div.append(btn);
      $('form').append(div);


      

     if(obj.Reponse != null  &&  obj.Reponse.length != 0){
         let ext  = JSON.parse(obj.Reponse);
         let area =  $('#reponseArea-' + obj.id).children();
         let array = new Array();
         for(let i = 0; i < area.length  ; i++){
           
                for(let j = 0; j < ext.length; j++){
                    if($(area[i]).children().eq(1).text() == ext[j]){
                        $(area[i]).children().eq(0).attr("checked" , true);     
                }
                
             }
            
         }

     }
      
 }


 
 $('body').delegate('.EnregistreQuestion' , 'click', (e)=>{
    let id = getIdElem(e);
    enregistreLesQuestionQuestion(id);
})




 function enregistreLesQuestionQuestion(id){

    let cible ;

    listeObj.forEach( (e)=>{
          if(e.id == id){
            
              cible = e;
          }
    })

 
     
     switch(cible.type){

                case "1" : enregistreQuestionListe(id , cible);         
                break;        

                case "2" : enregistreQuestionSimple(id , cible);
                          
                break;

                case "3" : enregistreQuestionLongue(id , cible);
                break;

                case "4" : enregistreQuestionListeCheckBox(id , cible);
                break;

                case "5" : enregistreQuestionListeCheckBox(id , cible);
                break;

                case "6" : enregistreQuestionSimple(id , cible);
                break;

                case "7" : enregistreQuestionNumerique(id , cible);



                





         }
}

 function enregistreQuestionNumerique(id , cible) {
     let regex = /[0-9]/;
      if(!regex.test($('#reponse-' + id).val()) || $('#reponse-' + id).val() == null){
         alert("Vous devez entre un chiffre dans la question +  " + cible.libelle + " ");
      }else{
         let val = $('#reponse-' + id).val();
         cible.Reponse = val;
         insertQuestion(cible);
      }
 }

function enregistreQuestionListeCheckBox(id , cible){

    let area = $('#reponseArea-' + id).children();
  
    
    let array = new Array();
    for(let i = 0; i < area.length ; i++){
      
          if($(area[i]).children().eq(0).is(':checked') == true){
             array.push($(area[i]).children().eq(1).text());  
            
             
        
        }
    }

    if(array.length == 0){
        alert("Attention vous n'avez rien selection dans la question  " + cible.libelle + " Veuillez selection au moins une options svp !");
        return ;
    }

    
    cible.Reponse = JSON.stringify(array);
    

    
    insertQuestion(cible);

    
}


 function enregistreQuestionListe(id , cible){
        
    let val = $('#reponse-' + id).children(":selected").text();
    

    cible.Reponse = val;
    insertQuestion(cible);

   
}
 


 function creerBtnEnregistrer(obj){
    let btn = document.createElement('input');
    $(btn).attr('type', 'button');
    $(btn).attr('value', 'Enregistrer');
    $(btn).addClass('EnregistreQuestion');
    $(btn).attr('id' , 'Engreistrer-' + obj.id);
    return btn;
 }

 function afficheQuestionListe(obj){
    let div = createTitre(obj);

    let divL = document.createElement("div");

    $(divL).addClass('listeReponse');

    let select =  document.createElement("select");

   


    if(obj.extendedclass != null){
        let ext = JSON.parse(obj.extendedclass);
        for(let i = 0; i < ext.length; i++){
           
            $(select).append('<option ' + 'value=' + i + ' >' + ext[i] + '</option>');
        }

    }

    $(select).attr('id' , 'reponse-' + obj.id);
    divL.append(select);

    if(obj.obligatoire == 1){
        let obligatoire = createObligatoire(obj)
        div.append(divL);
        div.append(obligatoire);
        let btn  = creerBtnEnregistrer(obj);
        div.append(btn);
        $('form').append(div)
    }else{
        div.append(divL);
        div.append('<input type="button" value="Enregistrer"');
        let btn  = creerBtnEnregistrer(obj);
        div.append(btn);
        $('form').append(div)

        
        if(obj.Reponse != null){
            let options =  $('#reponse-' + obj.id).children();
            for(let i = 0; i < options.length; i++){
                    
                   if($(options[i]).text() == obj.Reponse){
                       $('#reponse-' + obj.id).val(i);
                   }
            }
        }
    }

 }

 function createTitreLong(obj){
    let div =   $('<div class="FormulairesReponseLongue">');

    div.attr('typeQuestion', obj.type);
    div.attr('id' , obj.id);
    let label = $('<label class="LibelleReponse"> '+ obj.libelle  +':  </label>');
    
    return div.append(label);
 }

 function afficheQuestionLongue(obj){


    let div = createTitreLong(obj);

    let divL  = document.createElement("div");

    let area = document.createElement("textarea");

    $(area).addClass('textAreaRep');


    $(area).attr("id", "reponse-" + obj.id);

    $(area).attr("rows" , 10);

    $(area).attr("cols" , 25);


    $(divL).addClass('reponseLongue');


    $(divL).append(area);

    $(div).append(divL);

    if(obj.obligatoire == 1){
        $(div).append(createObligatoire(obj));
    }
    let btn  = creerBtnEnregistrer(obj);
      
     div.append(btn);

    $('form').append(div);

    if(obj.Reponse !=null){
        
         $('#reponse-' + obj.id).text(obj.Reponse);
    }
    

 }


 function createTitre(obj){

      
    let div = $('<div class="FormulairesReponse">');
    div.attr('typeQuestion', obj.type);
    div.attr('id' , obj.id);
    let label = $('<label class="LibelleReponse"> '+ obj.libelle  +':  </label>');
   
    return div.append(label);

 }

 function createObligatoire(obj){

    let div3 = document.createElement("div");
    $(div3).addClass("obligatoireReponse");
    return $(div3).append('<label>Le champ est obligatoire !');

 }



 function afficheQuestionCourte( obj){
    

   
     let div = createTitre(obj);

     let  input = $('<input type="text" class="reponseCourteForm" >');
     input.attr('id', 'reponse-' + obj.id);
     input.attr('typeQuestion', obj.type);
     if(obj.Reponse != null){
        if(obj.type == "7")
        console.log(obj.Reponse)
        input.val(obj.Reponse);
     }
     //contient le textBox de la réponse !
     let div2 = document.createElement("div");
     if(obj.obligatoire == 1 )
        input.attr('required' , true);


     $(div2).append(input);

     //contient le message obligatoire
   
     
     div.append(div2)

     

     if(obj.obligatoire == 1){
       
        $(div).append(createObligatoire(obj));
     }

     let btn  = creerBtnEnregistrer(obj);
      
    div.append(btn);

     $('form').append(div)
    
 }



 $('body').delegate('#envoie' , 'click', (e)=>{

    
        for (let i = 0; i < listeObj.length; i++){
            
                enregistreLesQuestionQuestion(listeObj[i].id);  
    }}
   
 )


 function getIdElem(e) {

    let target = e.currentTarget;
 
    let id = $(target).attr('id');
 
    let split_id = id.split("-");
 
    return split_id[1];
 
 }





