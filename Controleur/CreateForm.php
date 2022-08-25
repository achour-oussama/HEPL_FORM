<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');


include_once('../API/WebAPI.php');
include_once('fonctionUtile.php');


if (isset($_POST['type'])) {

  $type = $_POST['type'];

 

  switch ($type) {
    
    // Avec extended Class
    case   "1" : QuestionExtentedAttribut();
    break;
    // Sans extended Class
    case "2" :   QuestionSimpleRepet();
                
    break;
    case "3" :    QuestionSimpleRepet();

    break;

    case  "4" :   QuestionExtentedAttribut();

    case "5" :  QuestionExtentedAttribut();
    break;
    case "6" :    QuestionSimpleRepet();
    break;

    case "7" : QuestionExtentedAttribut();

  
    case "8": {
        if (isset($_POST['email']) && isset($_POST['nom'])  && isset($_POST['dateExp']) &&  isset($_POST['today'])) {


          $email =   htmlspecialchars($_POST['email']);

          $nom = htmlspecialchars($_POST['nom']);
          $today = htmlspecialchars($_POST['today']);
          $bdd = connexion();

          $array = array(
           
            'id' => null,
            'Nom' => $nom,
            'idUser' => $email,
            'today' => $today
          );
     
            createForm($bdd, $array);
            $num =  getMaxIdForm($bdd);

            $nombre = $num['id'];

            die(json_encode(array('Ok' => 'Enregistrement reussis ! ', 'code' => 200  , 'idForm'=>$nombre)));    
         
          
        }
      }
      break;
  }
}
