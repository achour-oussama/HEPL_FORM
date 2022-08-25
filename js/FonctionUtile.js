//Set le nom et le prenom de la personne connecter 
let prenom = sessionStorage.getItem('prenom');
let nom = sessionStorage.getItem('nom');


//Afficher le nom du connecter en haut de la page 
if(prenom != "" && nom != "" && nom != ""){
    
    $('#Bonjour').html('Bonjour ' + prenom + ' ' + nom + '!' + '/ se deconnecter !');

}


function getIdElem(e) {

    let target = e.currentTarget;
 
    let id = $(target).attr('id');
 
    let split_id = id.split("-");
 
    return split_id[1];
 }


 $('.Accueil').click(()=>{
    
    window.location.href = "http://localhost/projet-js-groupe-11/home.html";

 })


 $('#cacher').mouseover(()=>{
   
    $('.Hide').attr('hidden', false);

})



$('#cacher').mouseout(()=>{

    $('.Hide').attr('hidden', true);

})


// permet de recupere la date du jour
function getDdj() {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
 
    return today = yyyy + '-' + mm + '-' + dd;
 }


$('.Hide').click(()=>{
    sessionStorage.clear();
    window.location.href = "http://localhost/projet-js-groupe-11/inscription.html"; 
})









