<?php

             header('Access-Control-Allow-Origin: *');
             header('Content-Type: application/json; charset=UTF-8');
         
             include_once('../API/WebAPI.php');
      

             if(isset($_POST['email']) && isset($_POST['mdp'])){

                $bdd = connexion();

                $email = htmlspecialchars($_POST['email']);
                $mdp = htmlspecialchars($_POST['mdp']);

             

                $num = check($bdd , $email);
                if($num == 0){
                    header('HTTP/1.1 404 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERREUR' => 'L\'utilisateur existe pas !', 'code' => 404)));
                }else{
                     $data = getUtilisateur($bdd , $email);
                     if( password_verify($mdp ,$data['MDP'])){
                        header('HTTP/1.1 200 Internal Server Booboo');
                        header('Content-Type: application/json; charset=UTF-8');
                        die(json_encode(array('OK ' => 'Connexion reussis ! ', 'code' => 200 ,  'nom'  => $data['Nom']  , 'Prenom' => $data['Prenom']  ,'Email'  => $data['Email'] )));
                     }else{
                        header('HTTP/1.1 401 Internal Server Booboo');
                        header('Content-Type: application/json; charset=UTF-8');
                        die(json_encode(array('ERREUR' => 'Mot de passe incorect  !', 'code' => 401)));
                     }
                }

               
}