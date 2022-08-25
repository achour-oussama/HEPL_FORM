<?php
   

        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json; charset=UTF-8');

        include_once('../API/WebAPI.php');

        if(isset($_POST['type'])){
            // On recupere le nom et l'id du Formulaire
            if($_POST['type'] == "1"){
                $bdd = connexion();
            
                $nrow = FormExist($bdd, $_POST['id'] );
    
                if($nrow == 0){
    
                    header('HTTP/1.1 404 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERREUR' => 'Le formulaire n\'existe pas !', 'code' => 404)));
                }else{
                     $data = recupForm($bdd, $_POST['id'] );
    
                     die(json_encode($data));
                }

            }
            
            // On  recupere toutes les questions
            if($_POST['type'] == "2"){
                $bdd = connexion();
            
                $nrow = FormExist($bdd, $_POST['id'] );

               
    
                if($nrow == 0){
    
                    header('HTTP/1.1 404 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERREUR' => 'Le formulaire n\'existe pas !', 'code' => 404)));
                }else{
                     $data = recupQuestion($bdd, $_POST['id'] );
    

                     
                     die(json_encode($data));
                }

            }

             // On récupere tout les  Formulaire  pour les afficher dans l'index 
            if($_POST['type'] == "3"){
                $bdd = connexion();
            
                $nrow = userHaveForm($bdd, $_POST['id'] );

    
                if($nrow == 0){

                    die(json_encode(array('ERREUR' => 'Vous n\'avez pas encore creer de formulaire !', 'code' => 404)));
                }else{
                     $data = recupAllForm($bdd, $_POST['id'] );
    
                     $dato = array_reverse($data);
                     
                     die(json_encode($dato));
                }

            }

          

            // On récupere tout les  Formulaire qui ont ete partager au repondant 
            if($_POST['type'] == "4"){

                 

                 if(isset($_POST['form'])){

                     
                        $bdd = connexion();

                        $nrow = partageExist($bdd , $_POST['form'] );

                        if($nrow == 0){

                            die(json_encode(array('ERREUR' => 'Vous n\'avez pas encore creer de formulaire !', 'code' => 404)));
                        }else{

                            $data = getReponse($bdd , $_POST['form']);

                            die(json_encode($data));
                        
                        }
                 }

            }
         

        }