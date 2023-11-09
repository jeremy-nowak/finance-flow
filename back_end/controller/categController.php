<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once("../class/Categ.php");

$categ = new Categ();

if(isset($_GET["categ"])){
    $result = $categ->getCateg();
    echo json_encode($result);
    
}