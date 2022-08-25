
 var Email = $('#Form  input[name=Email] ');

 var mdp = $('#Form  input[name=password] ');
$('#Form').submit((e)=>{
    e.preventDefault();
    if($(Email).val() !=null && mdp.val() != null){
        $.ajax({
            url: "http://localhost/projet-js-groupe-11/Controleur/Connexion.php",
            type : 'POST',
            data : {
                        'email' : Email.val(),
                        'mdp'   : mdp.val()
              },
            success: (data) => {
                if(data.code == 200)
               {
                console.log("aaaaaa");
                

                    sessionStorage.setItem('email',  data.Email );
                    sessionStorage.setItem('prenom',  data.Prenom );
                    sessionStorage.setItem('nom',  data.nom );

                    console.log(sessionStorage.getItem('email'));

                    window.location.href = "http://localhost/projet-js-groupe-11/Home.html";              
               }
            },

            error : (data) => {
                if(data.code == 404){
                    alert(data.message);
                }else if(data.code == 401){
                    alert(data.message);
                }
            }
            
        })

    }else{
        alert('Veuillez entrer toute les valeurs svp !');
    }
})





