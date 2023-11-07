<?php
class User extends Database{
    
    private $login;

    public function __construct(){

        parent::__construct();

        if(isset($_SESSION["login"])){
            $this->setUserName($_SESSION["login"]);
        }
        else{
            $this->setUserName("");
        }

        
    }

// ------------------------------------Getter and Setter start----------------------------------
    public function getUserName(){
        return $this->login;
    }




    public function setUserName($login){
        $this->login = $login;
    }



    // ------------------------------------Getter and Setter end----------------------------------




    public function register($login, $password){

        $sql = "INSERT INTO `users`(`login`, `password`) VALUES (:login, :password)";
        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login, ':password' => $password]);

        
        echo "registerOK";
        return "registerOK";
    }

    
    public function connection($login, $password){
        $sql = "SELECT * FROM `users` WHERE `login` = :login";
        $select = $this->bdd->prepare($sql);
        $select->execute([':login' => $login]);
        $result = $select->fetch(PDO::FETCH_ASSOC);
    
        if($result){
            if(password_verify($password, $result["password"])){
                
                $_SESSION["login"] = $login;
                $this->setUserName($login);

                echo $login;
                return "connectionOK";
            }
            else{
                echo "connectionKO";
                return "connectionKO";
            }

        }
        else{
            echo "connectionKO";
            return "connectionKO";
        }
    }

    
    public function login_verify(){
            
            $sql = "SELECT * FROM `users` WHERE `login` = :login";
            $prepare = $this->bdd->prepare($sql);
            $prepare->execute([':login' => $this->login]);
            $result = $prepare->fetch(PDO::FETCH_ASSOC);
    
            if($result){
                echo "loginOK";
                return "loginOK";
            }
            else{
                echo "loginKO";
                return "loginKO";
            }
    }
    
    
    
}


?>