<?php
     header('Access-Control-Allow-Origin: *');
     header('Content-Type: application/json; charset=UTF-8');

    include_once('../API/WebAPI.php');

    if(isset($_POST['prenom']) && isset($_POST['nom']) && isset($_POST['email']) && isset($_POST['mdp'])){
        $prenom = htmlspecialchars($_POST['prenom']);
        $nom = htmlspecialchars($_POST['nom']);
        $mdp = htmlspecialchars($_POST['mdp']);
        $email = htmlspecialchars($_POST['email']);

        
        $cost = ['cost' => 12];
        $password = password_hash($mdp, PASSWORD_BCRYPT, $cost);

        $array = array(
            'Email' => $email,
            'Nom' => $nom,
            'Prenom' => $prenom,
            'MDP' => $password
        );  

        $bdd = connexion();

        // Je verifie si l'email existe 
        $num = check($bdd , $email);

        
        if($num > 0) {
            //Renvoie une erreur 
            header('HTTP/1.1 500 Internal Server Booboo');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array('ERROR' => 'L\'addresse email existe deja ! ', 'code' => 409)));
        }else{

        inscription($bdd , $array);

        header('HTTP/1.1 200 Internal Server Booboo');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('Ok' => 'Enregistrement reussis ! ', 'code' => 200)));


        }


    }
