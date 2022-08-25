<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('../API/WebAPI.php');
include_once('fonctionUtile.php');


if (isset($_POST['type'])) {

  $type = $_POST['type'];
  switch ($type) {
    case "0": {
      if (isset($_POST['nom']) && isset($_POST['id'])  && isset($_POST['dateExp']) && isset($_POST['email']) ) {


        $email =   htmlspecialchars($_POST['email']);
      
        $nom = htmlspecialchars($_POST['nom']);

        $id =  htmlspecialchars($_POST['id']);

        $date = $_POST['dateExp'];
      

        $bdd = connexion();


        $nrow = isFormExist($bdd, $id);

        if($nrow > 0){
              
           updateForm($bdd, $nom  , $date  , $id );
           die(json_encode(array('Ok' => 'Modification reussis ! ', 'code' => 200)));

        }else{
          $array = array(
            'id' => $id,
            'Nom' => $nom,
            'idUser' => $email,
            'today' => $date
          );
             
          createForm($bdd, $array);
          die(json_encode(array('Ok' => 'Enregistrement reussis ! ', 'code' => 200)));
        }
      }


    }
  
    break;
    // Avec extendedclass
    case  "1" :  modifAvecrepet();
    break;
    // Sans ExtendedClass
    case "2" :   modifSansRepet();         
    break;
    case  "3" :  modifSansRepet();
    break;
    case  "4" :  modifAvecrepet();
    break;
    case  "5" :  modifAvecrepet();
    break;
    case  "6" :  modifSansRepet();
    break;
    case "7" :   modifAvecrepet();
    break;

    case "8" :  if(isset($_POST['id'])){
                $bdd = connexion();

                suppressionQuestion($bdd  , $_POST['id'] );

                die(json_encode(array('Ok' => 'Suppression reussis ! ', 'code' => 200)));

                
    }
  }
}