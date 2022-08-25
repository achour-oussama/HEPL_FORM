<?php  

        //Insertion Avec extendClass a null
        function QuestionSimpleRepet(){
            {
                if ( isset($_POST['id'])  && isset($_POST['type']) && isset($_POST['libelle'])   && isset($_POST['obligatoire'])){
                    
                 
                     $id = $_POST['id'];
                     $type =  htmlspecialchars($_POST['type']);
                     $libelle = htmlspecialchars($_POST['libelle']);
                 
                     

                     $bdd = connexion();

                    
                     insertQuestionSimple( $bdd , $type , $libelle  , $id , $_POST['obligatoire']  );

                     $row  = getMaxId($bdd);

                     $num = $row['idQuestion'];


                   
                     die(json_encode(array('OK ' => 'Connexion reussis ! ', 'code' => 200 ,  'id'  =>  $num  )));
        
                }
             }
        }

        //Insertion Avec extendClass non null
        function QuestionExtentedAttribut(){
            if (isset($_POST['type'])   &&   isset($_POST['obligatoire']) &&  isset($_POST['id']) && isset($_POST['extendedclass']) &&  isset($_POST['libelle']) ){


                $type =  htmlspecialchars($_POST['type']);
               
                $id = htmlspecialchars($_POST['id']);
                $extendedclass = $_POST['extendedclass'];
                $libelle = htmlspecialchars($_POST['libelle']);


                $bdd = connexion();

                insertQuestionCheckBox($bdd , $type , $libelle  , $id , $_POST['obligatoire']  , $extendedclass );

                $row  = getMaxId($bdd);

                $num = $row['idQuestion'];

                die(json_encode(array('OK ' => 'Connexion reussis ! ', 'code' => 200 ,  'id'  =>  $num  )));
        }
    }

        // Modification Avec extendClass a null
        function modifSansRepet(){
            if (  isset($_POST['id'])  && isset($_POST['type']) && isset($_POST['libelle'])   && isset($_POST['obligatoire']))
            {
                   
                   $id = htmlspecialchars($_POST['id']);
                   $type =  htmlspecialchars($_POST['type']);
                   $libelle = htmlspecialchars($_POST['libelle']);
          
                   $bdd = connexion();


                   encodeModifQuestionSimple( $bdd  ,  $libelle  , $id , $_POST['obligatoire']);

                   die(json_encode(array(' OK ' => 'Modification reussis ! ', 'code' => 200 )));
                   
            }
        }

         // Modification Avec extendClass non null
        function modifAvecrepet(){
            if ( isset($_POST['id'])  && isset($_POST['type']) && isset($_POST['libelle'])   && isset($_POST['obligatoire']) && isset($_POST['extendedclass']))
            {
                   
                   $id = htmlspecialchars($_POST['id']);
                   $type =  htmlspecialchars($_POST['type']);
                   $libelle = htmlspecialchars($_POST['libelle']);
                   $extendedclass = $_POST['extendedclass'];
          
                   $bdd = connexion();


                   encodeModifQuestionComplexe( $bdd  ,  $libelle  , $id , $_POST['obligatoire'] , $extendedclass );

                   die(json_encode(array(' OK ' => 'Modification reussis ! ', 'code' => 200 )));
                   
            }
        }


        function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }