<?php
require_once("Database.php");

class Categ extends Database{

    
    public function __construct(){
        parent::__construct();
    }

    public function getCateg(){

        $sql = "SELECT * FROM category";
        $select = $this->bdd->prepare($sql);
        $select->execute();
        
        
        return $select->fetchAll(PDO::FETCH_ASSOC);


    }
}