// Je prend les tag html
//----------------------------------------------declaration variable globale------------------------------------------*/
var nom = $('#Form  input[name=Nom] ');

var prenom = $('#Form  input[name=Prenom] ');

var email  = $('#Form  input[name=Email] ');

var Email_Retype  = $('#Form  input[name=Email_retype] ');

var passWord  = $('#Form  input[name=password] ');

var passWord_Retype = $('#Form  input[name=password_retype]');

var stringmail = /^[\w\-\.]+@([\w-]*hepl\.)+be$/;

//var regex2 = /^[\w\-\.]+@([\w]+[\.]){0,1}(hepl\.)+be$/;

var stringPassWord  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,25}$/;

/*------------------------------------------------Soumission Formulaire ----------------------------------------------------------*/
$('#Form').submit((e)=>{

    e.preventDefault();

   let Array =  CheckForm();
   if(Array.length > 0){

    // Check erreur entrer utilisateur
    Array.forEach((erreur)=>{
        //console.log(erreur);
    switch (erreur){

        case "InvalidName" : labelError('nom' , "Le nom doit faire minimum 3 caractères !" ); 
        break;

        case "NameTooLong" : labelError('nom' , "Le nom doit faire maximum 22 caractères !"); 
        break;

        case "InvalidSurname" :  labelError('prenom' , "Le prenom doit faire minimum 3 caractères ! ");
        break;

        

        case "SurnameTooLong" : labelError('prenom' , "Le prenom doit faire minimum 3 caractères ! ");
        break;

        case "InvalidEmail" : labelError('email' , "L'Email doit avoir un format @hepl.be!");
        break;

        case "NotSameEmail" : labelError('email2' , "Les adresse ne correspondent pas  !");
        break;

        case "InvalidPassword" : labelError('mdp' , "Mot de passe doit contenir minimum Une lettre Majuscule et mininuscule et un chiffre");
        break;

        case  "NotSamePassWord" :  labelError('mdp2' , "Les mots de passe sont différents !");
        break;

        
   }

})

   }else{
    //Enregistrement dans la BD
        prenom = escapeHtml($(prenom).val());
        nom = escapeHtml($(nom).val());
        email = escapeHtml($(email).val());
        mdp = escapeHtml($(passWord).val());
        
        $.ajax({

            url: "http://localhost/projet-js-groupe-11/Controleur/Inscription.php",
            type: 'POST',
            data: {

                'prenom' : prenom,
                'nom' : nom,
                'email' : email,
                'mdp' : mdp

            },

            success: (data)=>{
                

                alert("Inscirption Réussis la page va être recharger !");

                location.reload();
                   
                
                
            },

            error: (data)=>{

                     if(data.responseJSON.code == 409){
                        let test = !!document.getElementById('alert');
                         if(test == false)
                        $('.container-fluid').after('<div  id="alert" class="alert alert-danger" role="alert">   email existante </div>');
                      
                  }
                
            }

            
        } )
    
   }
    
  
})

/*------------------------------------------------------Check les inputs------------------------------------------ */
function CheckForm(){
    //Je declare un tableau
let array = new Array();
if($(nom).val() == null || $(nom).val().length < 3){

    
    array.push("InvalidName");
}else{
    removeLabel();
}

if( $(nom).val().length > 20){

    array.push("NameTooLong");

}


if($(prenom).val() == null || $(prenom).val().length < 3){

    array.push("InvalidSurname");

}

if( $(prenom).val().length > 20){

    array.push("SurnameTooLong");

}



if(!stringmail.test($(email).val()) || $(email).val() == null){
    array.push("InvalidEmail");
}

if($(email).val() != $(Email_Retype).val() || $(Email_Retype).val() == null){
    array.push("NotSameEmail");
}

if(!stringPassWord.test($(passWord).val()) ||  $(passWord).val() == null ){
    array.push("InvalidPassword");
}

if($(passWord_Retype).val() != $(passWord).val() || $(passWord_Retype).val() == '' ){

    array.push("NotSamePassWord");

}


return array;

    
}


function labelError( tag , error){
  let label  = document.createElement('label');
    $(label).text(error)
    $(label).addClass('error ');
    $(label).css('color', 'red');
    let id = '#' + tag;
    
    let div  = document.querySelector(id);

    div.appendChild(label);

      
}

$('#nom').keypress((e)=>{

     let nb = $('#nom').length;
     console.log(typeof nb)
    if(nb < 1 )
    {
        labelError( 'nom' ,  "Nom trop court !");
    }else if(nb > 30 ){
        console.log('jfjdjdfsjfj');
        labelError( 'nom' ,  "Nom trop long !");
    }else{
        removeLabel('#nom');
    }
})



function removeLabel(id){

    if( $(id).length > 1)
    $(id).find("div:last").remove();
    
}


function escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
  
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }





