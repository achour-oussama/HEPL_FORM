var ListForm;
RecupForm();


function RecupForm() {
  $.ajax({
    dataType: 'json',
    url: "http://localhost/projet-js-groupe-11/Controleur/RecupData.php",
    type: 'post',

    data: {
      'type': '3',
      'id': sessionStorage.getItem('email')
    },
    success: (data) => {

      console.log(data);
      ListForm = data;
      afficheForm();
    },

    error: (error) => {
        
        console.log(error);
        console.log('error');
        infoAffiche();
    }
  })

}


$('#createForm').click(() => {

  sessionStorage.setItem('form', "");

  window.location.href = "http://localhost/projet-js-groupe-11/CreationForm.html";


})


$('#mesPartages').click(() => {

  window.location.href = "http://localhost/projet-js-groupe-11/ListeFormLecture.html";

})




function infoAffiche(){
      let tr = document.createElement('tr')

      $(tr).append('<td>' + 'AUCUN FORMULAIRE !!'+ ' </td>');
      $(tr).append('<td>' + '00-00-0000'+ ' </td>');
      $(tr).append('<td>' + '00-00-0000'+ ' </td>');

      $('#table').append(tr);

      
}

// Permet afficher les fomulaire
function afficheForm(){
    
    for(let i=0; i < ListForm.length; i++){
       let tr = document.createElement('tr');

       let nomform = document.createElement('td');
       let datecrea = document.createElement('td');
       let dateexp = document.createElement('td');
       let partager = document.createElement('td');
       let part =  document.createElement('td');
       let voir =  document.createElement('td');
       let elm = ListForm[i];

       $(nomform).text(ListForm[i].Nom);
       $(nomform).addClass('nomForm');
       $(nomform).attr('id', 'NomForm-' + ListForm[i].id);

       
       $(datecrea).text(ListForm[i].dateCreation);
       $(datecrea).addClass('dateCreation');
       $(datecrea).attr('id', 'dateCreation-' + ListForm[i].id );

       if(ListForm[i].dateExpiration == null){
          $(dateexp).text('Pas de date expiration ');
          $(dateexp).addClass('dateExp');
          $(dateexp).attr('id', 'dateExp-' + ListForm[i].id );
       }else{
           $(dateexp).text(ListForm[i].dateExpiration);
           $(dateexp).addClass('dateExp');
           $(dateexp).attr('id', 'dateExp-' + ListForm[i].id );
       }
     

       $(partager).text('Partager en lecture');
       $(partager).addClass('Partager');
       $(partager).attr('id', 'Partager-' + ListForm[i].id );


       $(part).text('Partager le formulaire');
       $(part).addClass('Part');
       $(part).attr('id', 'Part-' + ListForm[i].id );


       $(voir).text('Voir les réponse');
       $(voir).addClass('Voir');
       $(voir).attr('id', 'Voir-' + ListForm[i].id );

       $(tr).append(nomform);
       $(tr).append(datecrea);
       $(tr).append(dateexp);
       $(tr).append(partager);
       $(tr).append(part);
       $(tr).append(voir);

       $('#table').append(tr);

       
    }
     
}





// Met le bouton orange 
$('.boxeIndex').delegate(  '.nomForm', 'mouseover', (e) => {
  let id = getIdElem(e);
  $("#NomForm-" + id).css('background', 'orange');

  $("#NomForm-" + id).css('color', 'white');

})

//Le remet comme avant
$('.boxeIndex').delegate(  '.nomForm', 'mouseout', (e) => {
  let id = getIdElem(e);
  $("#NomForm-" + id).css('background', 'white');
  $("#NomForm-" + id).css('color', 'black');

})


$('.boxeIndex').delegate(  '.nomForm', 'click', (e) => {
  let id = getIdElem(e);
  sessionStorage.setItem('form', id);
  window.location.href = "http://localhost/projet-js-groupe-11/CreationForm.html";

})


$('body').delegate('.Part' , 'click', (e)=>{

    let id = getIdElem(e);
    sessionStorage.setItem('form', id);
    window.location.href = "http://localhost/projet-js-groupe-11/envoieMail.html";
       
})



$('body').delegate('.Voir' , 'click', (e)=>{

  let id = getIdElem(e);
  sessionStorage.setItem('form', id);
  window.location.href = "http://localhost/projet-js-groupe-11/ListReponse.html";
     
})


$('body').delegate('.Partager', 'click', (e)=>{

    let id = getIdElem(e);
    sessionStorage.setItem('form', id);
    window.location.href = "http://localhost/projet-js-groupe-11/PartageForm.html";


})