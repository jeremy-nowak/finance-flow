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

                echo json_encode($result);
                return $result;
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

    public function context($login)
    {
        // on récupère toutes les données de l'utilisateur (sauf le mot de passe), ses transactions, et les catégories de ses transactions pour le mois en cours
        $sql = "SELECT users.login, users.solde, transaction.*, category.* FROM `users` INNER JOIN `transaction` ON users.id_user = transaction.id_user INNER JOIN `category` ON transaction.id_categ = category.id_category WHERE `login` = :login";

        // récup le user
        // $sql = "SELECT * FROM `users` WHERE `login` = :login";

        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login]);
        $result = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            // on récupère toutes les données de l'utilisateur (sauf le mot de passe)
            $sql2 = "SELECT login, solde FROM `users` WHERE `login` = :login";
            $prepare2 = $this->bdd->prepare($sql2);
            $prepare2->execute([':login' => $login]);
            $result2 = $prepare2->fetch(PDO::FETCH_ASSOC);
            return $result2;
        }
    }

    public function monthlyData($login)
    {
        // on récupère toutes les transactions de l'utilisateur pour le mois en cours avec le nom de la catégorie
        $sql = "SELECT transaction.*, category.name FROM `transaction` INNER JOIN `category` ON transaction.id_categ = category.id_category WHERE `id_user` = (SELECT id_user FROM `users` WHERE `login` = :login) AND MONTH(`date`) = MONTH(CURRENT_DATE()) AND YEAR(`date`) = YEAR(CURRENT_DATE()) ORDER BY `date` DESC";

        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login]);
        $result = $prepare->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }

    public function yearlyData($login)
    {
        // on récupère toutes les transactions de l'utilisateur pour le mois en cours avec le nom de la catégorie
        $sql = "SELECT transaction.*, category.name FROM `transaction` INNER JOIN `category` ON transaction.id_categ = category.id_category WHERE `id_user` = (SELECT id_user FROM `users` WHERE `login` = :login) AND YEAR(`date`) = YEAR(CURRENT_DATE()) ORDER BY `date` DESC";

        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([':login' => $login]);
        $result = $prepare->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        } else {
            return false;
        }
    }
}
