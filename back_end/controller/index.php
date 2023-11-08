<?php
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
   header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');    
    if (isset($_POST["connection"])) {

        if(isset($_POST["login"]) && isset($_POST["password"])){
            require_once("../class/User.php");

            $login = htmlspecialchars($_POST["login"]);
            $password = htmlspecialchars($_POST["password"]);

            $user = new User();
            $user->connection($login, $password);
        }
        else{
            echo "connectionKO";
        }

        $user = new User();
        $user->setUserName($_POST["login"]);


    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="../../front_end/public/dollaz.png" />
    <title>Back-end</title>
</head>
<body>
    
</body>
</html>