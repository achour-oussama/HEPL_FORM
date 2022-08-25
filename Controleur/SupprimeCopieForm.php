<?php

header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json; charset=UTF-8');

        include_once('../API/WebAPI.php');

        if(isset($_POST['type'])   ){
            $type = $_POST['type'];
            $id = $_POST['id'];
            switch($type){

                case "1" :  
                    if(isset($_POST['id'])){
                        $bdd = connexion();

                        deleteAllQuestion($bdd , $id);
    
                        deleteForm($bdd , $id);
                        
                        die(json_encode(array('OK' => 'Le formulaire est supprimer !', 'code' => 200)));

                    }
                 
                break;

                case  "2" : 
                    if(isset($_POST['id']) && isset($_POST['date']) && isset($_POST['email']) &&  isset($_POST['nom'])){
                        $bdd = connexion();
                        
                        dupliqueForm($bdd , $_POST['id'] , $_POST['date'] , $_POST['email'] , $_POST['nom']);
                        
                        die(json_encode(array('OK' => 'Le formulaire est copier !', 'code' => 200)));

                    }

            
            }
        }