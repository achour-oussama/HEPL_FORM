<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include_once('../API/WebAPI.php');

if (isset($_POST['type'])) {

    $type = $_POST['type'];

    switch ($type) {

        case "1": {
                $bdd = connexion();
                $data = getUsers($bdd, $_POST['type']);

                die(json_encode(array($data)));
            }
            break;
        case "2": {

               
                $bdd = connexion();
                $data = getUsers($bdd, $_POST['type']);


                $nrow = check($bdd, $_POST['email']);

                if ($nrow == 0) {
                    //Renvoie une erreur 
                    header('HTTP/1.1 500 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERROR' => 'L\'addresse email existe pas ! ', 'code' => 404)));
                } else {

                    $nrow = isPartageLectureExist($bdd, $_POST['form'], $_POST['email']);
                    print_r($nrow);
                    if ($nrow > 0) {
                        header('HTTP/1.1 500 Internal Server Booboo');
                        header('Content-Type: application/json; charset=UTF-8');
                        die(json_encode(array('ERROR' => 'Le formualire a deja été partager avec ce user ! ', 'code' => 409)));
                    } else {
                        createPartageLecture($bdd, $_POST['form'], $_POST['email']);
                        die(json_encode(array('code' => 'Le partage est effectué ! ', 'code' => 200)));
                    }
                }
            }
            break;

        case "3": {

                $bdd = connexion();
                $nrow = chekListeLecture($bdd, $_POST['email']);

                if ($nrow == 0) {
                    //Renvoie une erreur 
                    header('HTTP/1.1 500 Internal Server Booboo');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('ERROR' => 'L\'addresse email existe pas ! ', 'code' => 404)));
                } else {
                    $data  = GetListLecture($bdd, $_POST['email']);
                    die(json_encode($data));
                }
            }
    }
}
