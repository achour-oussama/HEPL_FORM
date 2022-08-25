import { Form } from './Class/Form.js';
import {Reponse} from './Class/Reponse.js';

var listeObj = new Array();

var iddiv = 1;

var param = sessionStorage.getItem('params');

loadForm();

function loadForm(){
   
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


function initiateListe(data) {
    for (let i = 0; i < data.length; i++) {
       let obj = new Reponse(data[i].idReponse , data[i].typeQuestion ,  data[i].libelle , data[i].obligatoire , data[i].extentedClass , data[i].Reponse);


       afficheQuestion(obj);
       listeObj.push(obj);

       iddiv++;


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


 function afficheQuestionDate(obj){
    let div = createTitre(obj);

    let divD = document.createElement("div");


    let date = document.createElement("input");

    $(date).addClass("reponseCourteForm");

    $(date).attr('type' , 'date');

    $(date).attr('disabled' , 'disabled');

    $(date).attr('id' , 'reponse-' + obj.id);
    

    $(divD).append( date);

    $(div).append(divD);

    if(obj.obligatoire == 1){
        div.append(createObligatoire(obj));
    }
   
 
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
                $(input).attr("disabled", "disabled");
                $(input).addClass('CheckBoxajouter');
                $(divCheckBox).append(label);
                $(divCheckBox).append(input);
            }else{
                let input = document.createElement("input");
                $(input).attr("type", "radio");
                $(input).attr("disabled", "disabled");
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

    
      
      
     
      $('form').append(div);


      

     if(obj.Reponse != null){

         let ext  = JSON.parse(obj.Reponse);
         let area =  $('#reponseArea-' + obj.id).children();
         let array = new Array();
         for(let i = 0; i < area.length ; i++){
                for(let j = 0; j < ext.length; j++){
                    if($(area[i]).children().eq(1).text() == ext[j]){
                        $(area[i]).children().eq(0).attr("checked" , true);   
                }
                
             }
         }

     }
      
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

    $(select).attr('disabled', 'disabled');

    divL.append(select);

    if(obj.obligatoire == 1){
        let obligatoire = createObligatoire(obj)
        div.append(divL);
        div.append(obligatoire);
       
     
        $('form').append(div)
    }else{
        div.append(divL);
        div.append('<input type="button" value="Enregistrer"');
        
      
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

    $(area).attr("disabled" , "disabled");

    $(area).attr("name" , "reponseLongue-" + obj.id);


    $(divL).addClass('reponseLongue');


    $(divL).append(area);

    $(div).append(divL);

    if(obj.obligatoire == 1){
        $(div).append(createObligatoire(obj));
    }
  
      
    

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
     input.attr('disabled', 'disabled');
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


     $('form').append(div)
    
 }



 $('.pdf').click(()=>{
    genPDF();
 })


 function genPDF() {
	var doc = new jsPDF();
    var specialElementHandlers = {
        '.pdf' : function(element,render) {return true;}
    };

    doc
    
    doc.fromHTML($('form').get(0), 20,20,{
                 'width':500,
        		'elementHandlers': specialElementHandlers
    });
	
	doc.save('Test.pdf');
	
}


