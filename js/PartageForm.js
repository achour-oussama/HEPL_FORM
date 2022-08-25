
var UserListe = new Array();


function getUser(){

        $.ajax({
              url : "http://localhost/projet-js-groupe-11/Controleur/PartageForm.php",
              type : "POST",
              dataType : "json",
              data : {
                    type : "1"
              },
              success: (data)=>{
                     data.forEach((element)=>{
                          element.forEach((elem)=>{
                              if(elem.Email != sessionStorage.getItem('email')){
                                        UserListe.push(elem.Email);
                                        console.log(elem.Email)
                                   }

                          })
                     })
                   
              },
              error: (err)=>{
                  console.log(err);
              }
        })

}



getUser();

 $('#Nom').autocomplete({
      source: UserListe,
      minLength: 2
 })


 $('#submit').click((e) => {
      e.preventDefault();

      if($('#Nom').val() == null){
            alert('Veuillez entrer une adresse email svp !');
      }else{
             $.ajax({
                  url: 'http://localhost/projet-js-groupe-11/Controleur/PartageForm.php',
                  dataType: 'json',
                  type: 'POST',

                  data: {
                              type: '2',
                              email : $('#Nom').val(),
                              form : sessionStorage.getItem('form')
                  },
                  success: (e)=>{
                        console.log(e);
                        alert('Formulaire partager !!');
                  }, 

                  error: (e)=>{
                         console.error(e)
                  }

             })
      }
 })