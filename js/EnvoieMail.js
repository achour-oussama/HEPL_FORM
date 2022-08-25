var stringmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


$('#submit').click((e)=>{
     e.preventDefault();
     if(!stringmail.test($('#Email').val())){
            $('#label').attr('hidden' , false);
     }else{
        $('#label').attr('hidden' , true);

           

            $.ajax({
              dataType: 'json',
              type: 'POST',
              url: 'http://localhost/projet-js-groupe-11/Controleur/EnvoieMail.php',

              data:{
                     'id' : sessionStorage.getItem('form'),
                     'email' :  $('#Email').val()
              },
              success: (data)=>{
                    if(data.code == 200){
                         alert("Mails envoyer !");
                    }
              },

              error: (data)=>{
                console.log(data);
              }
        })

     }
})


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}