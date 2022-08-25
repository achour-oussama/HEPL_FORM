<?php
     header('Access-Control-Allow-Origin: *');
     header('Content-Type: application/json; charset=UTF-8');

     include_once('../API/WebAPI.php');

     include_once('fonctionUtile.php');
    
  
     if(isset($_POST['id']) && isset($_POST['email']) ){

    


            $bdd = connexion();
            $param = generateRandomString(10);
            $lien = "http://localhost/projet-js-groupe-11/ReponseFormulaire.html" . "?" . "form=" . $param;
            $id = $_POST['id'];
            $email =   htmlspecialchars($_POST['email']);
            $header="MIME-Version: 1.0\r\n";
            $header.='From:"HeplForm.com"<aminekhalladi5@outlook.com>'."\n";
            $header.='Content-Type:text/html; charset="uft-8"'."\n";
            $header.='Content-Transfer-Encoding: 8bit';


            $array   = getNomForm($bdd , $id );
            $nom =  $array[0];
            $titre = "Votre le lien pour le formulaire!" ;
            $message  ="Bonjour Madame,Monsieur, ". "<br>" ." vous trouverez ci-joint votre lien pour le Formulaire: \" ";
            $message .=  "$nom"  . "\"" . "<br>" .  "voici le lien: " . "<br>" . "$lien";

           // isPartageExist($bdd , $id  , $email);
            


            createPartage($bdd , $id , $param , $email);

            
            createReponse($bdd , $id , $param );
            

            if(mail($email, $titre  , $message   , $header) == 1){
                  die(json_encode(array("Ok" => "Le Formulaire à été envoyer !" , "code" => "200")));
            }else{
                  die(json_encode(array("Error" => "Le Formulaire n'a pas été envoyer !" , "code" => "550")));
            }       
      }
     