<?php

include_once "modules/bills/bills-model.php";
include_once "modules/users/users-model.php";

if (isset($_POST["action"])) {

   if ($_POST["action"] === "get_bill") {
       echo json_encode(getBill($_POST["id_bill"]));

   } elseif ($_POST["action"] === "get_bills") {
       echo json_encode(getBills());

   } elseif ($_POST["action"] === "create_bill") {
       echo createBill();

   } elseif ($_POST["action"] === "delete_bills") {
       echo json_encode(deleteBills(json_decode($_POST["ids"])));

   } elseif ($_POST["action"] === "get_user") {
       echo json_encode(getUser($_POST["id"]));
   } elseif ($_POST["action"] === "update_bill") {
       echo json_encode(updateBill(
           $_POST["id_bill"],
           $_POST["total"],
           $_POST["created_at"])
       );
   }
}
