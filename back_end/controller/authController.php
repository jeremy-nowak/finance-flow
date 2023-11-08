<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


// session_start();
//    __________________________________________________
//    Connexion
if (isset($_POST["connection"])) {

    if (isset($_POST["login"]) && isset($_POST["password"])) {
        require_once("../class/User.php");

        $login = htmlspecialchars($_POST["login"]);
        $password = htmlspecialchars($_POST["password"]);

        $user = new User();
        $user->connection($login, $password);
    } else {
        echo "connectionKO";
    }
}

if (isset($_POST["register"])) {

    var_dump($_POST);

    // echo $_POST["login"];
    // echo $_POST["password"];
    // echo $_POST["confirmation"];

    // if (isset($_POST["login"]) && isset($_POST["password"])) {
    //     require_once("../class/User.php");

    //     $login = htmlspecialchars($_POST["login"]);
    //     $password = htmlspecialchars($_POST["password"]);

    //     $user = new User();
    //     $user->register($login, $password);
    // } else {
    //     echo "registerKO";
    // }
}
