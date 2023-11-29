<?php

require_once("Database.php");

class Transaction extends Database
{

    public function __construct()
    {

        parent::__construct();
    }

    public function addTransaction($amount, $title, $date, $type, $category, $userId)
    {
        $sql = "INSERT INTO `transaction`(`amount`, `title`, `date`, `type`, `id_categ`, `id_user`) VALUES (:amount, :title, :date, :type, :category, :id_user)";
        $prepare = $this->bdd->prepare($sql);
        $prepare->execute([
            ':amount' => $amount,
            ':title' => $title,
            ':date' => $date,
            ':type' => $type,
            ':category' => $category,
            ':id_user' => $userId
        ]);

        // update de la colonne "solde" dans la table user à l'aide du $amount et du $type ainsi que de l'id_user
        // si $type = "debit" alors $amount est soustrait à la colonne "solde"
        // si $type = "credit" alors $amount est ajouté à la colonne "solde"
        if ($type == "debit") {
            $sql2 = "UPDATE `users` SET `solde`= solde - :amount WHERE `id_user` = :id_user";
        } else if ($type == "credit") {
            $sql2 = "UPDATE `users` SET `solde`= solde + :amount WHERE `id_user` = :id_user";
        }
        $prepare2 = $this->bdd->prepare($sql2);
        $prepare2->execute([
            ':amount' => $amount,
            ':id_user' => $userId
        ]);



        echo json_encode("Transaction ajoutée");
    }

    // public function getTransactions($userId)
    // {
    //     $sql = "SELECT * FROM `transactions` WHERE `id_user` = :id_user";
    //     $prepare = $this->bdd->prepare($sql);
    //     $prepare->execute([
    //         ':id_user' => $userId
    //     ]);
    //     $data = $prepare->fetchAll(PDO::FETCH_ASSOC);
    //     return $data;
    // }

    // public function getTransactionsByDate($userId, $date)
    // {
    //     $sql = "SELECT * FROM `transactions` WHERE `id_user` = :id_user AND `date` = :date";
    //     $prepare = $this->bdd->prepare($sql);
    //     $prepare->execute([
    //         ':id_user' => $userId,
    //         ':date' => $date
    //     ]);
    //     $data = $prepare->fetchAll(PDO::FETCH_ASSOC);
    //     return $data;
    // }

    // public function getTransactionsByType($userId, $type)
    // {
    //     $sql = "SELECT * FROM `transactions` WHERE `id_user` = :id_user AND `type` = :type";
    //     $prepare = $this->bdd->prepare($sql);
    //     $prepare->execute([
    //         ':id_user' => $userId,
    //         ':type' => $type
    //     ]);
    //     $data = $prepare->fetchAll(PDO::FETCH_ASSOC);
    //     return $data;
    // }

    // public function getTransactionsByCategory($userId, $category)
    // {
    //     $sql = "SELECT * FROM `transactions` WHERE `id_user` = :id_user AND `category` = :category";
    //     $prepare = $this->bdd->prepare($sql);
    //     $prepare->execute([
    //         ':id_user' => $userId,
    //         ':category' => $category
    //     ]);
    //     $data = $prepare->fetchAll(PDO::FETCH_ASSOC);
    //     return $data;
    // }
}
