<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('../API/WebAPI.php');
include_once('fonctionUtile.php');


if (isset($_POST['type'])) {

    $type  = $_POST['type'];

    $bdd = connexion();


    switch ($type) {

        case "0": {

                if (isset($_POST['param'])) {
                    $param = $_POST['param'];
                    $nrow = isformRepExist($bdd, $param);
                    if ($nrow == 0) {

                        header('HTTP/1.1 404 Internal Server Booboo');
                        header('Content-Type: application/json; charset=UTF-8');
                        die(json_encode(array('ERREUR' => 'Le formulaire n\'existe pas !', 'code' => 404)));
                    }
                    $data = getFormRep($bdd, $param);

                    die(json_encode($data));
                }
            }
            break;

        case "1": {
                if (isset($_POST['id']) && isset($_POST['reponse'])) {

                    

                    $bdd = connexion();

                    updateReponseSimple($bdd, $_POST['id']  , $_POST['reponse']);

                    die(json_encode(array("ok" => "Ligne insérer" , 'code' => 200)));


                }
            }

            break;

        case "9": {

            if (isset($_POST['param'])){

                $param = $_POST['param'];
                $nrow = isquestionRepExist($bdd, $param);
                if ($nrow == 0) {

                    header('HTTP/1.1 404 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERREUR' => 'Le formulaire ne possede aucune question !', 'code' => 404)));
                }
                $data = getQuestionRep($bdd, $param);

                die(json_encode($data));

            }

          
            }
    }
}
