<?php
       function connexion(){
        try 
        {
            $bdd = new PDO("mysql:host=localhost;dbname=heplform;charset=utf8", "root", "root");

          

            return $bdd;

        }
        catch(PDOException $e)
        {
            print_r($e->getMessage());
            die('Erreur : '.$e->getMessage());
        }

       
} 




function isFormExist($bdd , $id){

    $check = $bdd->prepare('select id from  formulaire where  id = ? ');


    $check->execute(array($id));

    $data = $check->fetch();

    return   $check->rowCount();


}


function insertQuestionSimple($bdd , $type , $libelle  , $id , $obli ){

    $check = $bdd->prepare('INSERT INTO  questions ( idQuestion ,  typeQuestion , libelle  , formId , obligatoire , extraInformation ) VALUES  (?,?,?,?,?,?)');


    $check -> execute( array(null ,  $type , $libelle  , $id , $obli  , null ));

}

function  insertQuestionCheckBox($bdd , $type , $libelle , $id , $obli  , $extendedclass ){

    $check = $bdd->prepare('INSERT INTO  questions ( idQuestion ,  typeQuestion , libelle  , formId , obligatoire , extraInformation ) VALUES  (?,?,?,?,?,?)');


    $check -> execute( array(null ,  $type , $libelle  , $id , $obli  , $extendedclass ));

}


function getMaxId($bdd){
    $check = $bdd -> prepare('SELECT idQuestion FROM questions WHERE idQuestion=( SELECT max(idQuestion) FROM questions )');

     $check -> execute();

     return $check -> fetch();
}




function createForm($bdd , $array ){

    $check =  $bdd -> prepare('INSERT INTO formulaire(id, Nom , idUser , dateCreation) VALUES(:id, :Nom , :idUser , :today)');

    $check -> execute($array);

}


function check( $bdd , $email){
    $check = $bdd->prepare('select Email from  utilisateur where  Email = ? ');

   
    $check->execute(array($email));

   
    
    $data = $check->fetch();

    return   $check->rowCount();
}


function updateForm($bdd , $nom  , $dateExp  , $id ){


    $check = $bdd -> prepare('update formulaire set  Nom = ?  where id = ? ');
    $check->execute(array($nom   , $id));
    $check = $bdd -> prepare('update formulaire set  dateExpiration = ?  where id = ? ');
    $check->execute(array($dateExp   , $id));
    
}



function inscription( $bdd , $array ){
    $check =  $bdd -> prepare('INSERT INTO utilisateur(Email, Nom , Prenom , MDP ) VALUES(:Email, :Nom , :Prenom , :MDP)');
   
    $check -> execute($array);

    

}



function getUsers($bdd , $email){

    $check = $bdd->prepare('select *  from  utilisateur');

   
    $check->execute(array($email));

    return $data = $check->fetchAll();

}



function getUtilisateur($bdd , $email){

    $check = $bdd->prepare('select *  from  utilisateur where  Email = ? ');

   
    $check->execute(array($email));

    return $data = $check->fetch();

}



function encodeModifQuestionSimple( $bdd  , $libelle   ,     $id ,  $obli  ){

    $check = $bdd->prepare('update questions  set  libelle = ? , obligatoire= ?    where  idQuestion = ?  ');
  
    

    $check->execute(array( $libelle   , $obli    , $id));

}


function encodeModifQuestionComplexe( $bdd  ,  $libelle   , $id , $obli , $extra){
    $check = $bdd->prepare('update questions  set  libelle = ?  , obligatoire= ? , extraInformation =?    where  idQuestion = ?  ');
  
    $check->execute(array( $libelle   , $obli , $extra  , $id));

}


function getMaxIdForm($bdd){

    $check = $bdd -> prepare('SELECT id FROM formulaire WHERE id=( SELECT max(id) FROM formulaire )');

    $check -> execute();

    return $check -> fetch();

}


function suppressionQuestion($bdd  , $id){
    $check = $bdd -> prepare('delete from questions where idQuestion = ? ');
    $check -> execute(array($id));
}


function FormExist($bdd , $id){

    $check = $bdd -> prepare('select id from formulaire where id = ?  ');
    $check -> execute(array($id));
    $check ->fetch();

    return $check->rowCount();

}


function recupForm($bdd, $id ){
    $check = $bdd -> prepare('select nom , dateExpiration from formulaire where id = ?');

    $check -> execute(array($id));
    return $check ->fetch();

}


function recupQuestion($bdd, $id ){
    $check = $bdd -> prepare('select idQuestion , typeQuestion  , libelle , obligatoire , extraInformation 
    from questions where formId = ?  ORDER by idQuestion ASC ');

    $check -> execute(array($id));
    return $check ->fetchAll();
}


function recupAllForm($bdd, $id ){

    $check = $bdd -> prepare('select * from formulaire where idUser = ?  ');
    $check -> execute(array($id));
     return $check ->fetchAll();  
}

function userHaveForm($bdd, $id){
    $check = $bdd -> prepare('select * from formulaire where idUser = ?  ');
    $check -> execute(array($id));
     $check ->fetchAll();

     return $check ->rowCount();
}


function deleteAllQuestion($bdd , $id){
    $check = $bdd -> prepare('delete from questions where formId = ? ');
    $check -> execute(array($id));  
}

function deleteForm($bdd , $id){
    $check = $bdd -> prepare('delete from formulaire where id = ? ');
    $check -> execute(array($id)); 

}


function getNomForm($bdd , $id ){
    $check = $bdd -> prepare('select Nom from formulaire where id = ? ');
    $check -> execute(array($id)); 
    return $check -> fetch();
}


function  createPartage($bdd , $id , $param , $email){
    $check = $bdd -> prepare('INSERT INTO reponsecreation(params, idForm , UserId) VALUES(?, ? , ?)');
    $check -> execute(array($param , $id , $email)); 
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}

function createReponse($bdd , $id , $param ){
   
        $check = $bdd->prepare('select DISTINCT    libelle , typeQuestion ,  obligatoire , extraInformation from questions where formId = ?');
        $check->execute(array($id));
        $data = $check->fetchAll();

        $comteur = 0;
        $i = 1;
        $array = array();
        // print_r($data);
         foreach($data as $tab){
         
         $insert = $bdd -> prepare('INSERT into reponsequestion (idParams  , libelle , typeQuestion , obligatoire , extentedClass) values (?,?,?,?,?)');

         $insert->execute([ $param  , $tab['libelle'] , $tab['typeQuestion'] , $tab['obligatoire'] , $tab['extraInformation'] ]);
         $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       }   

      

}


function getFormRep($bdd, $param ){
    $check = $bdd->prepare('select formulaire.Nom , formulaire.dateExpiration FROM reponsecreation INNER JOIN formulaire on (formulaire.id = reponsecreation.idForm) where reponsecreation.params = ?');
    $check->execute(array($param));
    $data = $check->fetch();
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $data;
    
    
}


function isformRepExist($bdd, $param){
    $check = $bdd->prepare('select formulaire.Nom , formulaire.dateExpiration FROM reponsecreation INNER JOIN formulaire on (formulaire.id = reponsecreation.idForm) where reponsecreation.params = ?');
    $check->execute(array($param));
    $check->fetch();
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $check->rowCount();
}


function getQuestionRep($bdd , $param){
    $check = $bdd->prepare('select idReponse , libelle , typeQuestion , obligatoire , extentedClass , Reponse from reponsequestion where idParams = ?');
    $check->execute(array($param));
    $data =  $check->fetchAll();
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $data;
}

function isquestionRepExist($bdd , $param){
    $check = $bdd->prepare('select idReponse  ,libelle , typeQuestion , obligatoire , extentedClass , Reponse from reponsequestion where idParams = ?');
    $check->execute(array($param));
    $check->fetchAll();

    return $check->rowCount();

}


function updateReponseSimple($bdd, $id  , $reponse){

     $check = $bdd -> prepare('update  reponsequestion set Reponse = ? where idReponse = ?');
     $check->execute(array($reponse , $id));
     $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}


function  partageExist($bdd , $id ){
    $check = $bdd -> prepare('select   params , idForm , Nom , UserId from formulaire INNER JOIN reponsecreation on (reponsecreation.idForm = ?) ');
    $check->execute(array($id));
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $check->fetch();
    return  $check->rowCount();
     
}


function  getReponse($bdd , $id ){
    $check = $bdd -> prepare('select DISTINCT id , idUser , dateCreation , Nom , dateExpiration , reponsecreation.UserId , reponsecreation.params from formulaire INNER join reponsecreation on (id = reponsecreation.idForm) where id = ?');
    $check->execute(array($id));
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $check->fetchAll();
     
}


function createPartageLecture($bdd , $id , $email){

    $check = $bdd -> prepare('INSERT INTO partagelecture (idForm , Email) VALUES (? , ?)');
    $check->execute(array($id , $email));

}



function  isPartageLectureExist($bdd , $id , $email){
    $check = $bdd -> prepare('select * from partagelecture where Email = ? and idForm = ?');
    $check->execute(array($email , $id));
    $check -> fetch();
    return $check->rowCount();
}


function chekListeLecture($bdd , $id){
    $check = $bdd -> prepare('select * from partagelecture where Email = ?');
    $check->execute(array($id));
    $check -> fetchAll();
    return $check->rowCount();
}



function GetListLecture($bdd , $id){
    $check = $bdd -> prepare('select idForm , formulaire.Nom , formulaire.dateCreation , formulaire.idUser , formulaire.dateExpiration from partagelecture inner join formulaire on (IdForm = formulaire.id) where Email = ?');
    $check->execute(array($id));
    return $check -> fetchAll();
}




function dupliqueForm($bdd , $id , $date , $email, $nom){
    

    $newNom = $nom . 'copie_';

    $array = array(
           
        'id' => null,
        'Nom' => $newNom,
        'idUser' => $email,
        'today' => $date
      );
    createForm($bdd, $array);

    $idnewForm = getmaxidform($bdd);
 
    $idN = $idnewForm[0];


    $tabq = recupQuestion($bdd , $id);

   // print_r($tabq);


    foreach($tabq as $elem){

        $check = $bdd->prepare('INSERT into questions (typeQuestion , libelle , formId , obligatoire , extraInformation) values (?,?,?,?,?) ');

        $check->execute(array($elem['typeQuestion'] , $elem['libelle'] , $idN ,$elem['obligatoire'], $elem['extraInformation']));
        
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }



}


