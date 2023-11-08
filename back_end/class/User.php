<?php

require_once("Database.php");
class User extends Database
{

    private $login;

    public function __construct()
    {

        parent::__construct();

        if (isset($_SESSION["login"])) {
            $this->setUserName($_SESSION["login"]);
        } else {
            $this->setUserName("");
        }
    }

    // ------------------------------------Getter and Setter start----------------------------------
    public function getUserName()
    {
        return $this->login;
    }




    public function setUserName($login)
    {
        $this->login = $login;
    }



    // ------------------------------------Getter and Setter end----------------------------------


    public function register($login, $password, $confirmation)
    {
        if (!$this->login_verify($login)) {
            if ($password == $confirmation) {
                $password = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO `users`(`login`, `password`) VALUES (:login, :password)";
                $prepare = $this->bdd->prepare($sql);
                $prepare->execute([
                    ':login' => $login,
                    ':password' => $password
                ]);
                $_SESSION["login"] = $login;
                $this->setUserName($login);
                echo $login;
                return "registerOK";
            } else {
                echo "Les deux mots de passe ne correspondent pas";
                return "Les deux mots de passe ne correspondent pas";
            }
        } else {
            echo "Ce login est déjà utilisé";
            return "Ce login est déjà utilisé";
        }
    }


    public function connection($login, $password)
    {
        if ($result = $this->login_verify($login)) {
            if (password_verify($password, $result["password"])) {

                $_SESSION["login"] = $login;
                $this->setUserName($login);

                echo $login;
                return "connectionOK";
            } else {
                echo "Les informations de connexion sont incorrectes";
                return "Les informations de connexion sont incorrectes";
            }
        } else {
            echo "Les informations de connexion sont incorrectes";
            return "Les informations de connexion sont incorrectes";
        }
    }


    public function login_verify($login)
    {

        $sql = "SELECT * FROM `users` WHERE `login` = :login";
        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login]);
        $result = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
}
