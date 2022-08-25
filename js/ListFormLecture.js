
var ListFormTab;
getLectureForm();

function getLectureForm(){
 $.ajax({
                type : "POST",
                dataType : "json",
                url : "http://localhost/projet-js-groupe-11/Controleur/PartageForm.php",

                data : {
                     email : sessionStorage.getItem('email'),
                     type : 3
                },
                success : (data)=>{
                    ListFormTab  = data;
                    console.log(data);
                    afficheData();
              },
              error : (data)=>{
                 console.log(data);
              }
     })
}

function afficheData(){
    for (let index = 0; index < ListFormTab.length; index++) {
         
        let tr = document.createElement('tr');

        $(tr).attr('id' , 'rep-' + ListFormTab[index].idForm);
        $(tr).addClass('voir');

        let nom = $('<td>' + ListFormTab[index].Nom + '</td>');
        let idUser = $('<td>' + ListFormTab[index].idUser + '</td>' );
        let dateCreation = $('<td>' + ListFormTab[index].dateCreation + '</td>' );
        let dateExpiration = $('<td>' + ListFormTab[index].dateExpiration + '</td>' );

        $(tr).append(nom);
        $(tr).append(idUser);
        $(tr).append(dateCreation);
        $(tr).append(dateExpiration);

        $('#table').append(tr);
        
    }
}


$('body').delegate('.voir' , 'click', (e)=>{
    let id  = getIdElem(e);
    sessionStorage.setItem('form' , id);
    window.location.href = "http://localhost/projet-js-groupe-11/ListReponse.html";

})






