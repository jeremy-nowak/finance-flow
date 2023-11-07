<?php
class User extends Database{
    
    private $user_name;
    private $user_email;

    public function __construct(){

        parent::__construct();
    }

// ------------------------------------Getter and Setter start----------------------------------
    public function getUserName(){
        return $this->user_name;
    }
    public function getUserEmail(){
        return $this->user_email;
    }



    public function setUserName($user_name){
        $this->user_name = $user_name;
    }

    public function setUserEmail($user_email){
        $this->user_email = $user_email;
    }



    // ------------------------------------Getter and Setter end----------------------------------




    public function register($login, $password){

        $sql = "INSERT INTO `users`(`login`, `password`) VALUES (:login, :password)";
        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login, ':password' => $password]);

        
        echo "registerOK";
        return "registerOK";
    }

    
    public function connection(){
        $sql = "SELECT * FROM `users` WHERE `login` = :login AND `password` = :password";
        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $this->user_name, ':password' => $this->user_email]);
        $result = $prepare->fetch(PDO::FETCH_ASSOC);
        
        if($result){
            echo "connectionOK";
            return "connectionOK";
        }
        else{
            echo "connectionKO";
            return "connectionKO";
        }
    }

    
    public function login_verify(){
            
            $sql = "SELECT * FROM `users` WHERE `login` = :login AND `password` = :password";
            $prepare = $this->bdd->prepare($sql);
            $prepare->execute([':login' => $this->user_name, ':password' => $this->user_email]);
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