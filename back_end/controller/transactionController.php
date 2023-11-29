<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once("../class/Transaction.php");
$transaction = new Transaction();

session_start();

//    __________________________________________________
//    Ajout d'une transaction
if (isset($_POST["form"])) {
    if (isset($_POST["amount"]) && isset($_POST["date"]) && isset($_POST["type"]) && isset($_POST["category"])) {

        $amount = htmlspecialchars($_POST["amount"]);
        $title = htmlspecialchars($_POST["title"]);
        $date = htmlspecialchars($_POST["date"]);
        $type = htmlspecialchars($_POST["type"]);
        $category = htmlspecialchars($_POST["category"]);
        $userId = htmlspecialchars($_POST["id_user"]);

        $transaction->addTransaction($amount, $title, $date, $type, $category, $userId);
    } else {
        echo "Veuillez remplir tous les champs";
    }
}
