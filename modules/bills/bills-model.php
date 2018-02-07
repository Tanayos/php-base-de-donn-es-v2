<?php

include_once dirname(__FILE__) . "./../../libs/utility.php";
include_once dirname(__FILE__) . "./../users/users-model.php";

$db = connectDB("localhost", "base_test_1", "root", "root");
enablePHPMaxErros();
// $ids est un tableau contenant l'id de chaque facture à supprimer
function deleteBills($ids) {
   global $db;

   $sql = "DELETE FROM bills WHERE id = :id_bill";
   $query = $db->prepare($sql);
   $res = [];

   foreach ($ids as $id) {
       $query->bindParam(":id_bill", $id, PDO::PARAM_INT);
       $tmp = $query->execute();
       $res[] = (object)[
           "status" =>$tmp,
           "id" => $id
       ];

   }
   return $res;
}

// insère une nouvelle ligne de facture avec les infos du post
function createBill() {
    global $db;
    $sql = "INSERT INTO bills (id_user, total, created_at)
    VALUES (:id_user, :total, :created_at)";

    $query = $db->prepare($sql);
    $query->bindParam(":id_user", $_POST["id_user"], PDO::PARAM_STR);
    $query->bindParam(":total", $_POST["total"], PDO::PARAM_INT);
    $query->bindParam(":created_at", $_POST["created_at"], PDO::PARAM_STR);
    $res = $query->execute();
    return $db->lastInsertId();

}

// sélectionne une ligne de bills correspondant à l'id passé en paramètre
function getBill($id) {
    global $db;
    $sql ="SELECT * FROM bills WHERE id = :id";

    $statement = $db->prepare($sql);
    $statement->bindParam(":id", $id, PDO::PARAM_STR);
    $status = $statement->execute();
    $bill = $statement->fetch(PDO::FETCH_OBJ);
    // Recuperer les information de l'user facture
    $bill->user = getUser($bill->id_user);
    // debug($bill)
    return $bill;
}

// récupère toutes les lignes de bills
function getBills() {
    global $db;
    $sql = "SELECT * FROM bills";
    $statement = $db->query($sql);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_OBJ);

}

function updateBill($id_bill, $total, $updated_at) {
    global $db;
    $id_bill = (int)$id_bill;
    $sql = "UPDATE bills SET total = :total, created_at = :updated_at WHERE id = :id";

    $query = $db->prepare($sql);
    $query->bindParam(":id", $id_bill, PDO::PARAM_INT);
    $query->bindParam(":total", $total, PDO::PARAM_STR);
    $query->bindParam(":updated_at", $updated_at, PDO::PARAM_INT);

    return $query->execute();
}
