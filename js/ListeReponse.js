
// On recupere la liste des forms
function recupListeForm(){
    $.ajax({
          
          type: "POST",
          dataType: "json",
          url: 'http://localhost/projet-js-groupe-11/Controleur/RecupData.php',
          data: {
                  'type' : 4,
                  'form' : sessionStorage.getItem('form')
          },
          success: (data) => {
                 afficheReponse(data);
          },
          error: (err) => {
               console.error(err);
               infoAffiche();
          }

    })
}


// Affiche la liste des réponse 
function afficheReponse(data){
        data.forEach((elem)=>{
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let td2 = document.createElement('td');

            let nom = elem.Nom;

            $(tr).attr('id' , elem.params);
            $(tr).addClass('params');

        
           
            $(td).text(nom);
         

            $(td2).text(elem.UserId);

            $(tr).append(td);
            $(tr).append(td2);

            $('#table').append(tr);

              
        })
}





$('body').delegate('.params' , 'click', (e)=>{
     
    sessionStorage.setItem('params' ,   $(e.currentTarget).attr('id'));
    window.location.href = "http://localhost/projet-js-groupe-11/VoirReponse.html";
      
})

recupListeForm();