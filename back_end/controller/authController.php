<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once("../class/User.php");
$user = new User();

session_start();
//    __________________________________________________
//    Connexion
if (isset($_POST["connection"])) {

    if (isset($_POST["login"]) && isset($_POST["password"])) {

        $login = htmlspecialchars($_POST["login"]);
        $password = htmlspecialchars($_POST["password"]);

        $user->connection($login, $password);
    } else {
        echo "Veuillez remplir tous les champs";
    }
}

//    Context
if (isset($_POST["context"])) {
    if ($_POST["context"] == "fetchUser") {
        $login = htmlspecialchars($_POST["user"]);
        $data = $user->context($login);
        echo json_encode($data);
    } else if ($_POST["context"] == "fetchMonthly") {
        $login = htmlspecialchars($_POST["user"]);
        $monthlyData = $user->monthlyData($login);
        echo json_encode($monthlyData);
    }
}

//    Register
if (isset($_POST["register"])) {

    if ($_POST["register"] == "register") {
        if (isset($_POST["login"]) && isset($_POST["password"]) && isset($_POST["confirmation"])) {

            $login = htmlspecialchars($_POST["login"]);
            $password = htmlspecialchars($_POST["password"]);
            $confirmation = htmlspecialchars($_POST["confirmation"]);

            $user->register($login, $password, $confirmation);
        } else {
            echo "Veuillez remplir tous les champs";
        }
    } else if ($_POST["register"] == "login") {
        if ($_POST["login"] != "") {

            $login = htmlspecialchars($_POST["login"]);

            if ($user->login_verify($login)) {
                echo "Ce login est déjà utilisé";
            } else {
                echo "ok";
            }
        } else {
            echo "Champ vide";
        }
    }
}
